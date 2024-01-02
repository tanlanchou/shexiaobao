import { Injectable, Logger } from '@nestjs/common';
import { ProductAttachment } from 'src/connect/ProductAttachment';
import CommonService from './common.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductAttachmentService extends CommonService<ProductAttachment> {
  private readonly logger = new Logger(ProductAttachmentService.name);
  constructor(
    @InjectRepository(ProductAttachment)
    private productAttachmentRepository: Repository<ProductAttachment>,
  ) {
    super(productAttachmentRepository);
  }
}