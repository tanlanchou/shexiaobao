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
    let query = this.orderRepository.createQueryBuilder('order');

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
        query = query.andWhere(
          `${key.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase()} = :${key}`,
          {
            [key]: params[key],
          },
        );
      }
    });

    if (!!params.keywords) {
      const likeKeys = ['account', `'desc'`];

      let sql = '(';
      likeKeys.forEach((key) => {
        if (sql.length !== 1) {
          sql += ` or `;
        }
        sql += `${key
          .replace(/([a-z])([A-Z])/g, '$1_$2')
          .toLowerCase()} like :keywords`;
      });
      sql += ')';
      query = query.andWhere(sql, {
        keywords: `%${params.keywords}%`,
      });
    }

    if (params.user && params.user > 0) {
      query = query.andWhere(
        `(saler = :userId or hepler = :userId)`,
        {
          userId: params.user,
        },
      );
    }

    if (params.maxMoney && params.maxMoney > 0) {
      query = query.andWhere(
        `money < :maxMoney`,
        {
          maxMoney: params.maxMoney,
        },
      );
    }

    if (params.minMoney && params.minMoney > 0) {
      query = query.andWhere(
        `money > :minMoney`,
        {
          minMoney: params.minMoney,
        },
      );
    }

    if (params.maxAmountReceivable && params.maxAmountReceivable > 0) {
      query = query.andWhere(
        `amount_receivable < :maxAmountReceivable`,
        {
          maxAmountReceivable: params.maxAmountReceivable,
        },
      );
    }

    if (params.minAmountReceivable && params.minAmountReceivable > 0) {
      query = query.andWhere(
        `amount_receivable > :minAmountReceivable`,
        {
          minAmountReceivable: params.minAmountReceivable,
        },
      );
    }

    if (params.saleRange) {
      const timeMax = params.saleRange.split(',');
      query = query.andWhere(
        `(sale_time > :startTime and sale_time < :endTime)`,
        {
          startTime: timeMax[0],
          endTime: timeMax[1]
        },
      );
    }


    const [results, total] = await query
      .orderBy('id', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      results,
      total,
    };
  }
}
