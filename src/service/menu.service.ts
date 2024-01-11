import { Injectable, Logger } from '@nestjs/common';
import { Menu } from 'src/connect/Menu';
import CommonService from './common.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MenuService extends CommonService<Menu> {
  private readonly menuger = new Logger(MenuService.name);
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
  ) {
    super(menuRepository);
  }
}
