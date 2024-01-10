import { Module } from '@nestjs/common';
import { GetPcasByCustomerUseCase } from './use-cases/browser/get-pca-by-customer.use-case';
import { PcaCrawlerService } from './pca-crawler.service';
import { SearchCustomerUseCase } from './use-cases/browser/search-customer.use-case';
import { CustomerRepository } from '@/infrastructure/persistence/typeorm/repository/customer.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from '@/infrastructure/database/entities/customer.entity';
import { CreatePCAUseCase } from './use-cases/pca/create-pca.use-case';
import { PCARepository } from '@/infrastructure/persistence/typeorm/repository/pca.repository';
import { PCAEntity } from '@/infrastructure/database/entities/pca.entity';
import { CreateCustomerUseCase } from './use-cases/customer/create-customer.use-case';
import { FindByCnpjCustomerUseCase } from './use-cases/customer/find-by-cnpj-customer.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity, PCAEntity])],

  providers: [
    GetPcasByCustomerUseCase,
    SearchCustomerUseCase,
    PcaCrawlerService,
    CustomerRepository,
    PCARepository,
    CreateCustomerUseCase,
    {
      provide: 'ICustomerRepository',
      useExisting: CustomerRepository,
    },
    FindByCnpjCustomerUseCase,
    {
      provide: 'ICustomerRepository',
      useExisting: CustomerRepository,
    },
    CreatePCAUseCase,
    {
      provide: 'IPCARepository',
      useExisting: PCARepository,
    },
  ],
  exports: [PcaCrawlerService],
})
export class PcaCrawlerModule {}
