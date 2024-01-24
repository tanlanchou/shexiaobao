import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../connect/User';
import { UserStatus } from 'src/common/enmu';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async createUser(userData: Partial<User>): Promise<User> {
    if (!userData.status) userData.status = UserStatus.normal;
    if (!userData.lastLoginTime) userData.lastLoginTime = new Date();
    if (!userData.creationTime) userData.creationTime = new Date();
    if (!userData.nickname) userData.nickname = this.generateRandomName();
    const newUser = this.userRepository.create(userData);
    return this.userRepository.save(newUser);
  }

  private generateRandomName(): string {
    const prefix = '用户';
    const randomSuffix = Math.floor(Math.random() * 100000).toString();
    const username = prefix + randomSuffix.padStart(5, '0');
    return username;
  }

  async findByPage(
    page: number,
    limit: number,
    params: any,
  ): Promise<{ results: User[]; total: number }> {
    let query = this.userRepository
      .createQueryBuilder('user')
      .innerJoinAndSelect('user.role', 'role');

    if (params.roleId) {
      query.where('user.role_id = :roleId', { roleId: params.roleId });
    }

    if (params.nickname) {
      query.andWhere('user.nickname like :nickname', {
        nickname: `%${params.nickname}%`,
      });
    }

    if (params.status) {
      query.andWhere('user.status = :status', {
        status: params.status,
      });
    }

    if (params.phoneNumber) {
      query.andWhere('user.phone_number = :phoneNumber', {
        phoneNumber: params.phoneNumber,
      });
    }

    if (params.createTimeRange && params.createTimeRange.length > 0) {
      const time = params.createTimeRange.split(',');
      query.andWhere(
        'user.creation_time BETWEEN :startTime AND :endTime',
        {
          startTime: time[0],
          endTime: time[1],
        },
      );
    }

    if (params.loginRange && params.loginRange.length > 0) {
      const time = params.loginRange.split(',');
      query.andWhere(
        'user.last_login_time BETWEEN :startTime AND :endTime',
        {
          startTime: time[0],
          endTime: time[1],
        },
      );
    }

    if (params.order !== undefined && params.order !== null) {
      switch (params.order) {
        case '0': query.orderBy('user.creationTime', "DESC"); break;
        case '1': query.orderBy('user.creationTime', "ASC"); break;
        case '2': query.orderBy('user.lastLoginTime', "DESC"); break;
        case '3': query.orderBy('user.lastLoginTime', "ASC"); break;
        default: query.orderBy('user.creationTime', "DESC"); break;
      }
    }



    const [results, total] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      results,
      total,
    };
  }

  async findAllUsers(): Promise<User[]> {
    return this.userRepository.find({ relations: ['role'] });
  }

  async findUserById(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id }, relations: ['role'] });
  }

  async findUserByRoleId(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { roleId: id },
      relations: ['role'],
    });
  }

  async findUserByPhonePWD(phone: string, pwd: string) {
    return this.userRepository.findOne({
      where: { phoneNumber: phone, password: pwd },
      relations: ['role'],
    });
  }

  async findUserByPhone(phone: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { phoneNumber: phone },
      relations: ['role'],
    });
  }

  async findUserBynickName(nickName: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { nickname: nickName },
      relations: ['role'],
    });
  }

  async updateUser(
    id: number,
    userData: Partial<User>,
  ): Promise<User | undefined> {
    await this.userRepository.update(id, userData);
    return this.userRepository.findOne({ where: { id }, relations: ['role'] });
  }

  async deleteUser(id: number): Promise<boolean> {
    const result = await this.userRepository.delete(id);
    return result.affected > 0;
  }
}
