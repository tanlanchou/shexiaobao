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
      query = query.where('user.role_id = :roleId', { roleId: params.roleId });
    }

    if (params.nickname) {
      query = query.andWhere('user.nickname like :nickname', { nickname: `%${params.nickname}%` });
    }

    if (params.status) {
      query = query.andWhere('user.status = :status', { status: params.status });
    }

    if (params.phoneNumber) {
      query = query.andWhere('user.phone_number = :phoneNumber', { phoneNumber: params.phoneNumber });
    }

    const [results, total] = await query
      .orderBy('user.creationTime', 'DESC')
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
    return this.userRepository.findOne({ where: { roleId: id }, relations: ['role'] });
  }

  async findUserByPhonePWD(phone: string, pwd: string) {
    return this.userRepository.findOne({
      where: { phoneNumber: phone, password: pwd }
      , relations: ['role']
    });
  }

  async findUserByPhone(phone: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { phoneNumber: phone }, relations: ['role'] });
  }

  async findUserBynickName(nickName: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { nickname: nickName }, relations: ['role'] });
  }

  async updateUser(
    id: number,
    userData: Partial<User>,
  ): Promise<User | undefined> {
    await this.userRepository.update(id, userData);
    return this.userRepository.findOne({ where: { id } });
  }

  async deleteUser(id: number): Promise<boolean> {
    const result = await this.userRepository.delete(id);
    return result.affected > 0;
  }
}
