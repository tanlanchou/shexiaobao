import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductAttachment } from 'src/connect/ProductAttachment';
import { Repository } from 'typeorm';

@Injectable()
export class ProductAttachmentService {
  private readonly logger = new Logger(ProductAttachmentService.name);
  constructor(
    @InjectRepository(ProductAttachment)
    private productAttachmentRepository: Repository<ProductAttachment>,
  ) {}

  async create(name: string): Promise<ProductAttachment> {
    const productAttachment = new ProductAttachment();
    productAttachment.name = name;
    await this.productAttachmentRepository.save(productAttachment);
    return productAttachment;
  }

  async findOne(id: number): Promise<ProductAttachment | null> {
    return this.productAttachmentRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<ProductAttachment[]> {
    return this.productAttachmentRepository.find();
  }

  async update(id: number, data: any): Promise<ProductAttachment> {
    const productAttachment = await this.findOne(id);
    if (productAttachment) {
      for (const key in data) {
        productAttachment[key] = data[key];
      }

      await this.productAttachmentRepository.save(productAttachment);
      return productAttachment;
    }
    return null;
  }

  async delete(id: number): Promise<void> {
    await this.productAttachmentRepository.delete(id);
  }
}
