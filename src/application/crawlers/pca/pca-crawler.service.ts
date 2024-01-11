import { Injectable } from '@nestjs/common';
import { GetPcasByCustomerUseCase } from './use-cases/browser/get-pca-by-customer.use-case';
import { SearchCustomerUseCase } from './use-cases/browser/search-customer.use-case';
import puppeteer from 'puppeteer';
import { CreateCustomerUseCase } from './use-cases/customer/create-customer.use-case';
import { FindByCnpjCustomerUseCase } from './use-cases/customer/find-by-cnpj-customer.use-case';

import { CreatePCAUseCase } from './use-cases/pca/create-pca.use-case';
import { extractNumbers } from '@/shared/helpers/string.helper';

@Injectable()
export class PcaCrawlerService {
  constructor(
    private readonly searchCustomerUseCase: SearchCustomerUseCase,
    private readonly getPcasByCustomerUseCase: GetPcasByCustomerUseCase,
    private readonly createPCAUseCase: CreatePCAUseCase,
    private readonly createCustomerUseCase: CreateCustomerUseCase,
    private readonly findByCnpjCustomerUseCase: FindByCnpjCustomerUseCase,
  ) {}

  async runCrawler() {
    const searchTextCustomer = 'cliente de testes';
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox'],

    });
    const page = await browser.newPage();
    try {
      await page.goto('https://www.bpsaude.com.br/Transparencia/', {
        timeout: 60000,
        waitUntil: 'domcontentloaded',
      });

      const customerData = await this.searchCustomerUseCase.execute(
        page,
        searchTextCustomer,
      );
      customerData.cnpj = extractNumbers(customerData.cnpj);

      await this.createCustomerUseCase.execute(customerData);

      const customer = await this.findByCnpjCustomerUseCase.execute(
        customerData.cnpj,
      );
      const pcas = await this.getPcasByCustomerUseCase.execute(page);
      for (let i = 0; i < pcas.length; i++) {
        await this.createPCAUseCase.execute(pcas[i], customer.id);
      }
      const customerWithPcas = await this.findByCnpjCustomerUseCase.execute(
        customerData.cnpj,
      );
      console.log(customerWithPcas, 'customer com pcas recuperado')
      console.log('Crawler finalizado !')

    }catch(error) {
      console.log(error)
    } finally {
      await browser.close();      
    }
  }
}
