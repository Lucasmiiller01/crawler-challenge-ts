import { Inject, Injectable } from '@nestjs/common';
import { ICustomerRepository } from '@/domain/customers/repositories/customer.repository.interface'; // Substitua pelo caminho real do seu repositório
import { extractNumbers } from '@/shared/helpers/string.helper';

interface CustomerInput {
  name: string;
  cnpj: string;
}

@Injectable()
export class FindOrCreateCustomerUseCase {
  private readonly customerRepository: ICustomerRepository;

  constructor(
    @Inject('ICustomerRepository') customerRepository: ICustomerRepository,
  ) {
    this.customerRepository = customerRepository;
  }

  public async execute(customerInput: CustomerInput): Promise<void> {
    const cnpj = extractNumbers(customerInput.cnpj);

    const customerExists = await this.customerRepository.findByCnpj(cnpj);
    if (!customerExists) {
      const customerData = this.customerRepository.create(
        customerInput.name,
        cnpj,
      );
      await this.customerRepository.save(customerData);
    }
  }
}
