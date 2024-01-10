import { PCA } from '@/domain/customers/entities/pca.entity';
import { extractNumbers } from '@/shared/helpers/string.helper';
import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class GetPcasByCustomerUseCase {
  async execute(page: puppeteer.Page): Promise<PCA[]> {
    return await this.openPca(page);
  }

  private async openPca(page: puppeteer.Page): Promise<PCA[]> {
    const linkSelector =
      'a.text-decoration-none[href^="/Transparencia/Orgao/"]';
    const linkElement = await page.$(linkSelector);

    if (linkElement) {
      await linkElement.click();
      await page.waitForNavigation();
    }
    const dataTable = await page.$$eval('td.px-3.align-middle', (tds) =>
      tds.map((td) => td.textContent.trim()),
    );

    const pcas: PCA[] = [];

    for (let i = 0; i < dataTable.length; i += 6) {
      const pca = new PCA(
        dataTable[i + 2],
        dataTable[i + 1],
        parseInt(dataTable[i].toString()),
        parseFloat(extractNumbers(dataTable[i + 3].split(',')[0])),
      );
      pcas.push(pca);
    }

    return pcas;
  }
}
