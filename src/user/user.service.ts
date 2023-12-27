import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../connect/User';
import { UserStatus } from 'src/common/enmu';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(userData: Partial<User>): Promise<User> {
    if (!userData.status) userData.status = UserStatus.normal;
    if (!userData.lastLoginTime) userData.lastLoginTime = new Date();
    if (!userData.creationTime) userData.creationTime = new Date();

    const newUser = this.userRepository.create(userData);
    return this.userRepository.save(newUser);
  }

  private generateRandomName(): string {
    const prefix = 'User';
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


  async findUserByEmail(phone: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { phoneNumber: phone } });
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
