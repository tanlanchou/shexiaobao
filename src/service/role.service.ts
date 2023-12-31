import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/connect/Role';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  private readonly logger = new Logger(RoleService.name);
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async create(name: string, n: bigint): Promise<Role> {
    const role = new Role();
    role.name = name;
    role.number = n;
    role.createDate = new Date();
    await this.roleRepository.save(role);
    return role;
  }

  async findOne(id: number): Promise<Role | null> {
    return this.roleRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  async update(id: number, data: any): Promise<Role> {
    const role = await this.findOne(id);
    if (role) {
      for (const key in data) {
        role[key] = data[key];
      }

      await this.roleRepository.save(role);
      return role;
    }
    return null;
  }

  async delete(id: number): Promise<void> {
    await this.roleRepository.delete(id);
  }
}
