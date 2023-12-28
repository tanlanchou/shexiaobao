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
    this.logger.log('创建用户成功');
    return this.userRepository.save(newUser);
  }

  private generateRandomName(): string {
    const prefix = '用户';
    const randomSuffix = Math.floor(Math.random() * 100000).toString();
    const username = prefix + randomSuffix.padStart(5, '0');
    return username;
  }

  async findAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findUserById(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findUserByPhonePWD(phone: string, pwd: string) {
    return this.userRepository.findOne({
      where: { phoneNumber: phone, password: pwd },
    });
  }


  async findUserByPhone(phone: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { phoneNumber: phone } });
  }

  async findUserBynickName(nickName: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { nickname: nickName } });
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
