import { Injectable, Logger } from '@nestjs/common';
import { OrderProduct } from 'src/connect/OrderProduct';
import CommonService from './common.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrderProductService extends CommonService<OrderProduct> {
  private readonly logger = new Logger(OrderProductService.name);
  constructor(
    @InjectRepository(OrderProduct)
    private orderProductRepository: Repository<OrderProduct>,
  ) {
    super(orderProductRepository);
  }

  async getProductByOrderId(orderId: number): Promise<OrderProduct[]> {
    return await this.orderProductRepository.find({
      where: { orderId: orderId },
    });
  }

  async deleteAllByOrderId(orderId: number): Promise<any> {
    return await this.orderProductRepository.delete({ orderId: orderId });
  }
}
