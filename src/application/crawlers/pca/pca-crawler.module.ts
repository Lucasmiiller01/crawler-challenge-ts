import { Module } from '@nestjs/common';
import { GetPcasByCustomerUseCase } from './use-cases/get-pca-by-customer.use-case';
import { PcaCrawlerService } from './pca-crawler.service';
import { SearchCustomerUseCase } from './use-cases/search-customer.use-case';

@Module({
  providers: [GetPcasByCustomerUseCase, SearchCustomerUseCase, PcaCrawlerService],
  exports: [PcaCrawlerService],
})
export class PcaCrawlerModule {}