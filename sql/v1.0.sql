CREATE TABLE user (
	id INT AUTO_INCREMENT PRIMARY KEY,
	-- 用户ID，自增，主键
	phone_number VARCHAR(20) NOT NULL,
	-- 手机号，长度20，不能为空
	nickname VARCHAR(50) NOT NULL,
	-- 昵称，长度50，不能为空
	role_id INT NOT NULL,
	-- 角色ID，数字，不能为空
	password VARCHAR(32),
	-- 密码，字符串，长度32，可以为空
	creation_time TIMESTAMP NOT NULL,
	-- 创建时间，时间类型，不能为空
	last_login_time TIMESTAMP NOT NULL,
	-- 最后登录时间，时间类型，不能为空
	status INT NOT NULL -- 状态，数字，不能为空
);

-- sxb.product definition
CREATE TABLE sxb.product () ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS sxb.product;

CREATE TABLE sxb.`role` (
	id INT auto_increment NOT NULL,
	name varchar(100) NOT NULL,
	create_date DATETIME NOT NULL,
	CONSTRAINT role_PK PRIMARY KEY (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE sxb.captcha (
	id INT auto_increment NOT NULL,
	phone_number varchar(20) NOT NULL,
	code varchar(10) NOT NULL,
	update_time DATETIME NOT NULL,
	CONSTRAINT captcha_PK PRIMARY KEY (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE sxb.product_category (
	id INT auto_increment NOT NULL,
	name varchar(50) NOT NULL,
	parent_id INT NOT NULL,
	status int DEFAULT 1 NOT NULL,
	CONSTRAINT product_category_PK PRIMARY KEY (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE sxb.product_quality (
	id INT auto_increment NOT NULL,
	name varchar(50) NOT NULL,
	`desc` varchar(100) NOT NULL,
	CONSTRAINT product_quality_PK PRIMARY KEY (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE sxb.product_origin (
	id INT auto_increment NOT NULL,
	name VARCHAR(30) NOT NULL,
	CONSTRAINT product_origin_PK PRIMARY KEY (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE sxb.power (
	id BIGINT auto_increment NOT NULL,
	name varchar(20) NOT NULL,
	`number` BIGINT NOT NULL,
	CONSTRAINT power_PK PRIMARY KEY (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE sxb.product_material (
	id INT auto_increment NOT NULL,
	name varchar(20) NOT NULL,
	CONSTRAINT product_Material_PK PRIMARY KEY (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE sxb.product_tag (
	id INT auto_increment NOT NULL,
	name varchar(20) NOT NULL,
	CONSTRAINT product_tag_PK PRIMARY KEY (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE sxb.product_storehouse (
	id INT auto_increment NOT NULL,
	name varchar(100) NOT NULL COMMENT '仓库名称',
	`desc` varchar(100) NULL COMMENT '描述',
	CONSTRAINT product_storehouse_PK PRIMARY KEY (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '仓库';

CREATE TABLE sxb.product_attachment (
	id int auto_increment NOT NULL,
	name varchar(15) NOT NULL COMMENT '附件名称',
	CONSTRAINT product_attachment_PK PRIMARY KEY (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE sxb.product_info (
	id INT auto_increment NOT NULL,
	title varchar(50) NOT NULL,
	product_type_id INT NOT NULL,
	product_category_id INT NOT NULL,
	product_quality_id INT NOT NULL COMMENT '成色类型',
	product_origin_id INT NOT NULL COMMENT '来源类型',
	origin_name varchar(50) NULL COMMENT '商品来源方名称',
	origin_id INT NULL COMMENT '来源商家ID',
	product_store_id int NOT NULL COMMENT '内部编号',
	`NO` varchar(50) NULL COMMENT '店铺编货',
	cost_price FLOAT NULL COMMENT '成本价',
	selling_price FLOAT NULL COMMENT '销售价',
	peer_price FLOAT NULL COMMENT '同行价',
	live_broadcast_price FLOAT NULL COMMENT '直播价',
	counter_price FLOAT NULL COMMENT '专柜价',
	`type` tinyint NULL COMMENT '类型 现代1|中古2',
	laser_marking varchar(50) NULL COMMENT '镭射刻印',
	for_people tinyint NULL COMMENT '1. 通用 2. 女 3. 男',
	`size` tinyint NULL COMMENT '1. 超迷你 2. 迷你 3. 小号 4. 中号 5.大号 6. 超大号',
	product_material varchar(200) NULL COMMENT '材质',
	color varchar(10) NULL COMMENT '颜色',
	count tinyint DEFAULT 1 NULL COMMENT '数量',
	arrival_time DATETIME NOT NULL COMMENT '到达时间',
	in_time DATETIME NOT NULL COMMENT '入库时间',
	buyer int NOT NULL COMMENT '买手',
	product_tag varchar(200) NULL COMMENT '标签',
	product_attach varchar(200) NULL COMMENT '附件',
	description varchar(200) NULL,
	status tinyint NULL COMMENT '1. 正常 2. 删除 3. 暂停',
	workflow int NOT NULL COMMENT '1. 未入库， 2. 入库 3. 开单。 4.出库',
	CONSTRAINT product_info_PK PRIMARY KEY (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE sxb.customer (
	id int auto_increment NOT NULL,
	name varchar(10) NOT NULL,
	`no` varchar(10) NULL COMMENT '客户编号',
	maintenance_man int NOT NULL COMMENT '维护人',
	intention varchar(100) NULL COMMENT '业务意向',
	`type` tinyint NULL COMMENT '1. 直客 2. 同行',
	sex tinyint NULL COMMENT '1 男 2 女',
	customer_tag varchar(100) NULL COMMENT '客户标签',
	customer_origin_id int NOT NULL,
	img varchar(100) NULL,
	`desc` varchar(100) NULL,
	PRIMARY KEY (id) -- 添加主键约束  
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

ALTER TABLE sxb.`role` ADD `number` BIGINT DEFAULT 0 NOT NULL;

ALTER TABLE sxb.power ADD `key` varchar(50) NOT NULL;

CREATE TABLE sxb.sales_channels (
	id INT auto_increment NOT NULL,
	name varchar(100) NULL,
	parent_id INT DEFAULT 0 NOT NULL
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE sxb.order_product (
	id INT auto_increment NOT NULL,
	order_id INT NOT NULL,
	product_id INT NOT NULL,
	create_date datetime NOT NULL,
	CONSTRAINT NewTable_PK PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE sxb.account (
	id INT auto_increment NOT NULL,
	name varchar(100) NOT NULL COMMENT '账户名称',
	`type` tinyint NOT NULL COMMENT '账户类型',
	CONSTRAINT account_PK PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci
COMMENT='收款账户';

CREATE TABLE sxb.`order` (
	id INT auto_increment NOT NULL,
	customer_id INT NOT NULL COMMENT '客户ID',
	sales_channels_id int NOT NULL COMMENT '销售途径ID',
	send_status tinyint NOT NULL COMMENT '发货状态',
	amount_receivable FLOAT NULL COMMENT '应收金额',
	account varchar(100) NOT NULL COMMENT '收款账户',
	money float NOT NULL COMMENT '收到金额',
	img varchar(300) NULL COMMENT '凭证图片，逗号分隔',
	saler int NOT NULL COMMENT '主要销售人员',
	hepler int NULL COMMENT '辅助销售人员',
	sale_time datetime NOT NULL COMMENT '销售时间',
	`desc` varchar(200) NULL COMMENT '备注',
	status tinyint NOT NULL COMMENT '1. 开单，运输中 2. 完成 3. 撤销订单',
	CONSTRAINT order_PK PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;

