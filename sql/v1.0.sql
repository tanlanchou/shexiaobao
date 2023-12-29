CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,   -- 用户ID，自增，主键
    phone_number VARCHAR(20) NOT NULL,   -- 手机号，长度20，不能为空
    nickname VARCHAR(50) NOT NULL,       -- 昵称，长度50，不能为空
    role_id INT NOT NULL,                -- 角色ID，数字，不能为空
    password VARCHAR(32),                -- 密码，字符串，长度32，可以为空
    creation_time TIMESTAMP NOT NULL,    -- 创建时间，时间类型，不能为空
    last_login_time TIMESTAMP NOT NULL,  -- 最后登录时间，时间类型，不能为空
    status INT NOT NULL                  -- 状态，数字，不能为空
);

-- sxb.product definition

CREATE TABLE sxb.product (

)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;
DROP TABLE IF EXISTS sxb.product;

CREATE TABLE sxb.`role` (
	id INT auto_increment NOT NULL,
	name varchar(100) NOT NULL,
	create_date DATETIME NOT NULL,
	CONSTRAINT role_PK PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE sxb.captcha (
	id INT auto_increment NOT NULL,
	phone_number varchar(20) NOT NULL,
	code varchar(10) NOT NULL,
	update_time DATETIME NOT NULL,
	CONSTRAINT captcha_PK PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;

