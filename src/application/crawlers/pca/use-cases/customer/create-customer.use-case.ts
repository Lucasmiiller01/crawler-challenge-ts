import { Inject, Injectable } from '@nestjs/common';
import { ICustomerRepository } from '@/domain/customers/repositories/customer.repository.interface'; // Substitua pelo caminho real do seu repositório

interface CustomerInput {
  name: string;
  cnpj: string;
}

@Injectable()
export class CreateCustomerUseCase {
  private readonly customerRepository: ICustomerRepository;

  constructor(
    @Inject('ICustomerRepository') customerRepository: ICustomerRepository,
  ) {
    this.customerRepository = customerRepository;
  }

  public async execute(customerInput: CustomerInput): Promise<void> {
    const customerExists = await this.customerRepository.findByCnpj(customerInput.cnpj);
    if (!customerExists) {
      const customerData = this.customerRepository.create(
        customerInput.name,
        customerInput.cnpj,
      );
      await this.customerRepository.save(customerData);
    }
  }
}
