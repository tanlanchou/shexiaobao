import { Controller } from '@nestjs/common';
import { AccountService } from 'src/service/account.service';
import { Account } from 'src/connect/Account';
import CommonController from './common.controller';

@Controller('account')
export class AccountController extends CommonController<Account> {
  constructor(private readonly accountService: AccountService) {
    super(accountService);
  }
}
