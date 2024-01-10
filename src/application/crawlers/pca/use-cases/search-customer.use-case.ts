import { CustomerResult } from '@/interfaces/customer.interfaces';
import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class SearchCustomerUseCase {
  async execute(page: puppeteer.Page, searchTerm: string): Promise<CustomerResult> {
    await this.searchCustomer(page, searchTerm);
    const customerData = await this.extractCustomerData(page);
    return customerData;
  }

  private async searchCustomer(
    page: puppeteer.Page,
    searchTerm: string,
  ): Promise<void> {
    const inputSelector = 'input#input-pesquisa-orgao';
    await page.waitForSelector(inputSelector);
    await page.type(inputSelector, searchTerm);
    await new Promise((r) => setTimeout(r, 2000));
    const buttonSelector = 'button#btn-pesquisa-orgao';
    (await page.$(buttonSelector)).click();
    await new Promise((r) => setTimeout(r, 5000));
  }

  private async extractCustomerData(page: puppeteer.Page): Promise<CustomerResult> {
    const customer = await page.$$eval('td.px-3', (tds) =>
      tds.map((td) => td.textContent.trim())
    );
    return { name: customer[1], cnpj: customer[0] };
  }
}
