import { Controller } from '@nestjs/common';
import { ProductAttachmentService } from 'src/service/product.attachment.service';
import { ProductAttachment } from 'src/connect/ProductAttachment';
import CommonController from './common.controller';

@Controller('product/attachment')
export class ProductAttachmentController extends CommonController<ProductAttachment> {
  constructor(
    private readonly productAttachmentService: ProductAttachmentService,
  ) {
    super(productAttachmentService);
  }
}
