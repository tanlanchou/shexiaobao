import { Injectable, Logger } from '@nestjs/common';
import { Customer } from 'src/connect/Customer';
import CommonService from './common.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService extends CommonService<Customer> {
  private readonly logger = new Logger(CustomerService.name);
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {
    super(customerRepository);
  }
}
