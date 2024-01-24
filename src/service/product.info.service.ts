import { Injectable, Logger } from '@nestjs/common';
import { ProductInfo } from 'src/connect/ProductInfo';
import CommonService from './common.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { productSearchType } from 'src/interface/productSearch';

@Injectable()
export class ProductInfoService extends CommonService<ProductInfo> {
  private readonly logger = new Logger(ProductInfoService.name);
  constructor(
    @InjectRepository(ProductInfo)
    private productInfoRepository: Repository<ProductInfo>,
  ) {
    super(productInfoRepository);
  }

  async findOne(id: number): Promise<ProductInfo | null> {
    return await this.productInfoRepository.findOne({
      where: { id }
    });
  }

  async search(
    page: number,
    limit: number,
    params: productSearchType,
  ): Promise<{ results: ProductInfo[]; total: number }> {
    const queryBuilder = this.productInfoRepository.createQueryBuilder();

    // 如果 params 存在 productOriginId，增加查询条件
    if (params.productOriginId != undefined) {
      queryBuilder.andWhere('product_origin_id = :productOriginId', {
        productOriginId: params.productOriginId,
      });
    }

    // 如果 params 存在 productStoreId，增加查询条件
    if (params.productStoreId != undefined) {
      queryBuilder.andWhere('product_store_id = :productStoreId', {
        productStoreId: params.productStoreId,
      });
    }

    if (params.productQualityId != undefined) {
      queryBuilder.andWhere('product_quality_id = :productQualityId', {
        productQualityId: params.productQualityId,
      });
    }

    // 如果 params 存在 productCategoryId，增加查询条件
    if (params.productCategoryId != undefined) {
      queryBuilder.andWhere('product_category_id = :productCategoryId', {
        productCategoryId: params.productCategoryId,
      });
    }

    if (params.productTypeId != undefined) {
      queryBuilder.andWhere('product_type_id = :productTypeId', {
        productTypeId: params.productTypeId,
      });
    }

    if (params.type != undefined) {
      queryBuilder.andWhere('type = :type', {
        type: params.type,
      });
    }

    if (params.forPeople != undefined) {
      queryBuilder.andWhere('for_people = :forPeople', {
        forPeople: params.forPeople,
      });
    }

    if (params.size != undefined) {
      queryBuilder.andWhere('size = :size', {
        size: params.size,
      });
    }

    if (params.buyer != undefined) {
      queryBuilder.andWhere('buyer = :buyer', {
        buyer: params.buyer,
      });
    }

    if (
      params.productMaterial != undefined &&
      Array.isArray(params.productMaterial)
    ) {
      params.productMaterial.forEach((item) => {
        queryBuilder.andWhere('product_material LIKE :productMaterial', {
          productMaterial: `%${item}%`,
        });
      });
    }

    if (params.productTag != undefined && Array.isArray(params.productTag)) {
      params.productTag.forEach((item) => {
        queryBuilder.andWhere('product_tag LIKE :productTag', {
          productTag: `%${item}%`,
        });
      });
    }

    if (
      params.productAttach != undefined &&
      Array.isArray(params.productAttach)
    ) {
      params.productAttach.forEach((item) => {
        queryBuilder.andWhere('product_attach LIKE :productAttach', {
          productAttach: `%${item}%`,
        });
      });
    }

    switch (params.order) {
      case 0:
        queryBuilder.orderBy(`in_time`, 'DESC');
        break;
      case 1:
        queryBuilder.orderBy(`in_time`, 'ASC');
        break;
      case 2:
        queryBuilder.orderBy(`arrival_time`, 'DESC');
        break;
      case 3:
        queryBuilder.orderBy(`arrival_time`, 'ASC');
        break;
      case 4:
        queryBuilder.orderBy(`cost_price`, 'DESC');
        break;
      case 5:
        queryBuilder.orderBy(`cost_price`, 'ASC');
        break;
      case 6:
        queryBuilder.orderBy(`selling_price`, 'DESC');
        break;
      case 7:
        queryBuilder.orderBy(`selling_price`, 'ASC');
        break;
      case 8:
        queryBuilder.orderBy(`peer_price`, 'DESC');
        break;
      case 9:
        queryBuilder.orderBy(`peer_price`, 'ASC');
        break;
      case 10:
        queryBuilder.orderBy(`live_broadcast_price`, 'DESC');
        break;
      case 11:
        queryBuilder.orderBy(`live_broadcast_price`, 'ASC');
        break;
      case 12:
        queryBuilder.orderBy(`counter_price`, 'DESC');
        break;
      case 13:
        queryBuilder.orderBy(`counter_price`, 'ASC');
        break;
    }

    if (params.keywords != undefined) {
      queryBuilder.andWhere(
        '(title LIKE :keywords OR origin_name LIKE :keywords OR NO LIKE :keywords OR laser_marking LIKE :keywords OR color LIKE :keywords OR description LIKE :keywords)',
        {
          keywords: `%${params.keywords}%`,
        },
      );
    }

    if (params.minCostPrice != undefined) {
      queryBuilder.andWhere('cost_price > :minCostPrice', {
        minCostPrice: `${params.minCostPrice}`,
      });
    }

    if (params.maxCostPrice != undefined) {
      queryBuilder.andWhere('cost_price < :maxCostPrice', {
        maxCostPrice: `${params.maxCostPrice}`,
      });
    }

    if (params.minSellingPrice != undefined) {
      queryBuilder.andWhere('selling_price > :minSellingPrice', {
        minSellingPrice: `${params.minSellingPrice}`,
      });
    }

    if (params.maxSellingPrice != undefined) {
      queryBuilder.andWhere('cost_price < :maxSellingPrice', {
        maxSellingPrice: `${params.maxSellingPrice}`,
      });
    }

    if (params.minPeerPrice != undefined) {
      queryBuilder.andWhere('peer_price > :minPeerPrice', {
        minPeerPrice: `${params.minPeerPrice}`,
      });
    }

    if (params.maxPeerPrice != undefined) {
      queryBuilder.andWhere('peer_price < :maxPeerPrice', {
        maxPeerPrice: `${params.maxPeerPrice}`,
      });
    }

    if (params.minLiveBroadcastPrice != undefined) {
      queryBuilder.andWhere('live_broadcast_price > :minLiveBroadcastPrice', {
        minLiveBroadcastPrice: `${params.minLiveBroadcastPrice}`,
      });
    }

    if (params.maxLiveBroadcastPrice != undefined) {
      queryBuilder.andWhere('live_broadcast_price < :maxLiveBroadcastPrice', {
        maxLiveBroadcastPrice: `${params.maxLiveBroadcastPrice}`,
      });
    }

    if (params.minCounterPrice != undefined) {
      queryBuilder.andWhere('counter_price > :minCounterPrice', {
        minCounterPrice: `${params.minCounterPrice}`,
      });
    }

    if (params.maxCounterPrice != undefined) {
      queryBuilder.andWhere('counter_price < :maxCounterPrice', {
        maxCounterPrice: `${params.maxCounterPrice}`,
      });
    }

    if (
      params.arraivalRange != undefined &&
      Array.isArray(params.arraivalRange) &&
      params.arraivalRange.length == 2
    ) {
      queryBuilder.andWhere('arrival_time > :minDate', {
        minDate: `${params.arraivalRange[0]}`,
      });

      queryBuilder.andWhere('arrival_time < :maxDate', {
        maxDate: `${params.arraivalRange[1]}`,
      });
    }

    if (
      params.inTImeRange != undefined &&
      Array.isArray(params.inTImeRange) &&
      params.inTImeRange.length == 2
    ) {
      queryBuilder.andWhere('in_time > :minDate', {
        minDate: `${params.inTImeRange[0]}`,
      });

      queryBuilder.andWhere('in_time < :maxDate', {
        maxDate: `${params.inTImeRange[1]}`,
      });
    }

    const [results, total] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      results,
      total,
    };
  }
}
