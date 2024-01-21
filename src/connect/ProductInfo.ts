import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product_info', { schema: 'sxb' })
export class ProductInfo {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'title', length: 50 })
  title: string;

  @Column('int', { name: 'product_type_id' })
  productTypeId: number;

  @Column('int', { name: 'product_category_id' })
  productCategoryId: number;

  @Column('int', { name: 'product_quality_id', comment: '成色类型' })
  productQualityId: number;

  @Column('int', { name: 'product_origin_id', comment: '来源类型' })
  productOriginId: number;

  @Column('varchar', {
    name: 'origin_name',
    nullable: true,
    comment: '商品来源方名称',
    length: 50,
  })
  originName: string | null;

  @Column('int', { name: 'origin_id', nullable: true, comment: '来源商家ID' })
  originId: number | null;

  @Column('int', { name: 'product_store_id', comment: '内部编号' })
  productStoreId: number;

  @Column('varchar', {
    name: 'NO',
    nullable: true,
    comment: '店铺编货',
    length: 50,
  })
  no: string | null;

  @Column('float', {
    name: 'cost_price',
    nullable: true,
    comment: '成本价',
    precision: 12,
  })
  costPrice: number | null;

  @Column('float', {
    name: 'selling_price',
    nullable: true,
    comment: '销售价',
    precision: 12,
  })
  sellingPrice: number | null;

  @Column('float', {
    name: 'peer_price',
    nullable: true,
    comment: '同行价',
    precision: 12,
  })
  peerPrice: number | null;

  @Column('float', {
    name: 'live_broadcast_price',
    nullable: true,
    comment: '直播价',
    precision: 12,
  })
  liveBroadcastPrice: number | null;

  @Column('float', {
    name: 'counter_price',
    nullable: true,
    comment: '专柜价',
    precision: 12,
  })
  counterPrice: number | null;

  @Column('tinyint', {
    name: 'type',
    nullable: true,
    comment: '类型 现代1|中古2',
  })
  type: number | null;

  @Column('varchar', {
    name: 'laser_marking',
    nullable: true,
    comment: '镭射刻印',
    length: 50,
  })
  laserMarking: string | null;

  @Column('tinyint', {
    name: 'for_people',
    nullable: true,
    comment: '1. 通用 2. 女 3. 男',
  })
  forPeople: number | null;

  @Column('tinyint', {
    name: 'size',
    nullable: true,
    comment: '1. 超迷你 2. 迷你 3. 小号 4. 中号 5.大号 6. 超大号',
  })
  size: number | null;

  @Column('varchar', {
    name: 'product_material',
    nullable: true,
    comment: '材质',
    length: 200,
  })
  productMaterial: string | null;

  @Column('varchar', {
    name: 'color',
    nullable: true,
    comment: '颜色',
    length: 10,
  })
  color: string | null;

  @Column('tinyint', {
    name: 'count',
    nullable: true,
    comment: '数量',
    default: () => "'1'",
  })
  count: number | null;

  @Column('datetime', { name: 'arrival_time', comment: '到达时间' })
  arrivalTime: Date;

  @Column('datetime', { name: 'in_time', comment: '入库时间' })
  inTime: Date;

  @Column('int', { name: 'buyer', comment: '买手' })
  buyer: number;

  @Column('varchar', {
    name: 'product_tag',
    nullable: true,
    comment: '标签',
    length: 200,
  })
  productTag: string | null;

  @Column('varchar', {
    name: 'product_attach',
    nullable: true,
    comment: '附件',
    length: 200,
  })
  productAttach: string | null;

  @Column('varchar', { name: 'description', nullable: true, length: 200 })
  description: string | null;

  @Column('tinyint', {
    name: 'status',
    nullable: true,
    comment: '1. 正常 2. 删除 3. 暂停',
  })
  status: number | null;

  @Column('int', {
    name: 'workflow',
    comment: '1. 未入库， 2. 入库 3. 开单。 4.出库',
  })
  workflow: number;

  @Column('varchar', {
    name: 'static_list',
    nullable: true,
    comment: '静态路径',
    length: 500,
  })
  staticList: string | null;

  @Column('varchar', {
    name: 'sizes',
    nullable: true,
    comment: '尺寸',
    length: 20,
  })
  sizes: string | null;
}
