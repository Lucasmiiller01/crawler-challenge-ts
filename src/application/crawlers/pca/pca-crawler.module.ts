import { Module } from '@nestjs/common';
import { GetPcasByCustomerUseCase } from './use-cases/get-pca-by-customer.use-case';
import { PcaCrawlerService } from './pca-crawler.service';
import { SearchCustomerUseCase } from './use-cases/search-customer.use-case';
import { FindOrCreateCustomerUseCase } from './use-cases/find-or-create-customer.use-case';
import { CustomerRepository } from '@/infrastructure/persistence/typeorm/repository/customer.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from '@/infrastructure/database/entities/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity])],

  providers: [
    GetPcasByCustomerUseCase,
    SearchCustomerUseCase,
    PcaCrawlerService,
    CustomerRepository, // Ajuste aqui
    FindOrCreateCustomerUseCase,
    {
      provide: 'ICustomerRepository',
      useExisting: CustomerRepository,
    },
  ],
  exports: [PcaCrawlerService],
})
export class PcaCrawlerModule {}
