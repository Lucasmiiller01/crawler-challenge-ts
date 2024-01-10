import { Customer } from '../entities/customer.entity';

export interface ICustomerRepository {
  findByCnpj(cnpj: string): Promise<Customer | null>;
  save(customer: Customer): Promise<void>;
  create(name: string, cnpj: string): Customer;
}