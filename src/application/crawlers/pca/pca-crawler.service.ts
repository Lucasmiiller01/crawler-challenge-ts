import { Injectable } from '@nestjs/common';
import { GetPcasByCustomerUseCase } from './use-cases/get-pca-by-customer.use-case';
import { SearchCustomerUseCase } from './use-cases/search-customer.use-case';
import puppeteer from 'puppeteer';
import { FindOrCreateCustomerUseCase } from './use-cases/find-or-create-customer.use-case';

@Injectable()
export class PcaCrawlerService {
  constructor(
    private readonly searchCustomerUseCase: SearchCustomerUseCase,
    private readonly getPcasByCustomerUseCase: GetPcasByCustomerUseCase,
    private readonly findOrCreateCustomerUseCase: FindOrCreateCustomerUseCase,

  ) {}

  async runCrawler() {
    const searchTextCustomer = 'cliente de testes';
    const browser = await puppeteer.launch({
      headless: 'new', 
    });
    const page = await browser.newPage();
    try {
      await page.goto('https://www.bpsaude.com.br/Transparencia/', {
        timeout: 60000,
        waitUntil: 'domcontentloaded',
      });

      const customerData = await this.searchCustomerUseCase.execute(page, searchTextCustomer);
      const customer = await this.findOrCreateCustomerUseCase.execute(customerData)
      console.log(customer)

    //  await this.getPcasByCustomerUseCase.execute(page);
    } finally {
      await browser.close();
    }
  }
}
