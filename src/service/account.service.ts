import { Injectable, Logger } from '@nestjs/common';
import { Account } from 'src/connect/Account';
import CommonService from './common.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AccountService extends CommonService<Account> {
  private readonly logger = new Logger(AccountService.name);
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {
    super(accountRepository);
  }
}
