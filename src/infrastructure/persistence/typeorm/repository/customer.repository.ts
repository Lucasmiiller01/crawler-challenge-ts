import { Repository } from 'typeorm';
import { Customer } from '@/domain/customers/entities/customer.entity';
import { ICustomerRepository } from '@/domain/customers/repositories/customer.repository.interface';
import { CustomerEntity } from '@/infrastructure/database/entities/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class CustomerRepository implements ICustomerRepository {
  constructor(
    @InjectRepository(CustomerEntity)
    private repository: Repository<CustomerEntity>,
  ) {}

  async findByCnpj(cnpj: string): Promise<Customer | null> {
    return this.repository.findOne({ where: { cnpj } });
  }

  async save(customer: Customer): Promise<void> {
    await this.repository.save(customer);
  }

  create(name: string, cnpj: string): Customer {
    const customer = new Customer(name, cnpj);
    return customer;
  }
}
