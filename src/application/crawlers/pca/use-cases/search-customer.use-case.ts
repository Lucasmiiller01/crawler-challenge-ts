import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class SearchCustomerUseCase {
  async execute(page: puppeteer.Page, searchTerm: string): Promise<void> {
    await this.performSearch(page, searchTerm);
  }

  private async performSearch(page: puppeteer.Page, searchTerm: string): Promise<void> {
    const inputSelector = 'input#input-pesquisa-orgao'
    await page.waitForSelector(inputSelector);
    await page.type(inputSelector, searchTerm);
    await new Promise(r => setTimeout(r, 2000));
    const buttonSelector = 'button#btn-pesquisa-orgao';
    (await page.$(buttonSelector)).click();    
    await new Promise(r => setTimeout(r, 5000));
  }
}