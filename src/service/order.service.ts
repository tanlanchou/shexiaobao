import { Injectable, Logger } from '@nestjs/common';
import { Order } from 'src/connect/Order';
import CommonService from './common.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService extends CommonService<Order> {
  private readonly logger = new Logger(OrderService.name);
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {
    super(orderRepository);
  }

  async findAllByUser(userId: number): Promise<Order[]> {
    return this.orderRepository.find({ where: { saler: userId } });
  }

  async findAllOrderByPage(
    page: number,
    limit: number,
    params: any,
  ): Promise<{ results: Order[]; total: number }> {
    const query = this.orderRepository.createQueryBuilder('order');

    const euqalKeys = [
      'customerId',
      'salesChannelsId',
      'sendStatus',
      'amountReceivable',
      'money',
      'saler',
      'hepler',
      'status',
    ];

    euqalKeys.forEach((key) => {
      if (params[key] !== undefined && params[key] !== null) {
        query.andWhere(
          `${key.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase()} = :id`,
          {
            id: params[key],
          },
        );
      }
    });

    if (!params.keyWords) {
      const likeKeys = ['account', 'desc'];

      let sql = '(';
      likeKeys.forEach((key) => {
        if (params[key] !== undefined && params[key] !== null) {
          if (sql.length !== 1) {
            sql += ` and `;
          }
          sql += `${key
            .replace(/([a-z])([A-Z])/g, '$1_$2')
            .toLowerCase()} like :keyWords`;
        }
      });
      sql += ')';
      query.andWhere(sql, {
        keyWords: `%${params.keyWords}%`,
      });
    }

    const [results, total] = await query
      .orderBy('saleTime', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      results,
      total,
    };
  }
}
