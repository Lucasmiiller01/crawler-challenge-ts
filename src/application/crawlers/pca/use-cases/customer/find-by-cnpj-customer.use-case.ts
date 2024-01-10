import { Inject, Injectable } from '@nestjs/common';
import { ICustomerRepository } from '@/domain/customers/repositories/customer.repository.interface'; // Substitua pelo caminho real do seu repositório
import { Customer } from '@/domain/customers/entities/customer.entity';

@Injectable()
export class FindByCnpjCustomerUseCase {
  private readonly customerRepository: ICustomerRepository;

  constructor(
    @Inject('ICustomerRepository') customerRepository: ICustomerRepository,
  ) {
    this.customerRepository = customerRepository;
  }

  public async execute(cnpj: string): Promise<Customer> {
    const customer = await this.customerRepository.findByCnpj(cnpj);
    return customer;
  }
}
