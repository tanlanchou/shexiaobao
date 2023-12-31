import { Injectable, Logger } from '@nestjs/common';
import { ProductTag } from 'src/connect/ProductTag';
import CommonService from './common.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductTagService extends CommonService<ProductTag> {
  private readonly logger = new Logger(ProductTagService.name);
  constructor(
    @InjectRepository(ProductTag)
    private productTagRepository: Repository<ProductTag>,
  ) {
    super(productTagRepository);
  }
}
