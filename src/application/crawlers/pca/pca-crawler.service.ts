import { Injectable } from '@nestjs/common';
import { GetPcasByCustomerUseCase } from './use-cases/get-pca-by-customer.use-case';
import { SearchCustomerUseCase } from './use-cases/search-customer.use-case';
import puppeteer from 'puppeteer';

@Injectable()
export class PcaCrawlerService {
  constructor(
    private readonly searchCustomerUseCase: SearchCustomerUseCase,
    private readonly getPcasByCustomerUseCase: GetPcasByCustomerUseCase,
  ) {}

  async runCrawler() {
    const searchTextCustomer = 'cliente de testes';
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    try {
      await page.goto('https://www.bpsaude.com.br/Transparencia/', {
        timeout: 60000,
        waitUntil: 'domcontentloaded',
      });

      await this.searchCustomerUseCase.execute(page, searchTextCustomer);
      await this.getPcasByCustomerUseCase.execute(page);
    } finally {
      await browser.close();
    }
  }
}
