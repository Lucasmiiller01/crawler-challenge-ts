import { EntityManager, Repository } from 'typeorm';
import { Customer } from '@/domain/customers/entities/customer.entity';
import { ICustomerRepository } from '@/domain/customers/repositories/customer.repository.interface';

export class CustomerRepository implements ICustomerRepository {
    private readonly repository: Repository<Customer>;
  
    constructor(private readonly entityManager: EntityManager) {
      this.repository = entityManager.getRepository(Customer);
    }
  
    async findById(id: string): Promise<Customer | null> {
      return this.repository.findOne({ where: { id } });
    }
  
    async save(customer: Customer): Promise<void> {
      await this.repository.save(customer);
    }
  
    create(id: string, name: string, cnpj: string): Customer {
      const customer = new Customer(id, name, cnpj);
      customer.id = id;
      customer.name = name;
      customer.cnpj = cnpj;
      return customer;
    }
  }