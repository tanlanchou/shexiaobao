import { Injectable, Logger } from '@nestjs/common';
import { RolePower } from 'src/connect/RolePower';
import CommonService from './common.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RolePowerService extends CommonService<RolePower> {
  private readonly logger = new Logger(RolePowerService.name);
  constructor(
    @InjectRepository(RolePower)
    private rolePowerRepository: Repository<RolePower>,
  ) {
    super(rolePowerRepository);
  }

  async findByRoleAndPower(roleId: number, key: string): Promise<RolePower> {
    return await this.rolePowerRepository.findOne({
      where: { roleId, powerName: key },
    });
  }

  async findByRole(roleId: number): Promise<RolePower[]> {
    const result = await this.rolePowerRepository.find({
      where: { roleId },
    });

    return result;
  }

  async deleteByRoleId(id: number): Promise<void> {
    const reuslt = await this.rolePowerRepository.find({
      where: { roleId: id },
    });
    await this.rolePowerRepository.remove(reuslt);
  }
}
