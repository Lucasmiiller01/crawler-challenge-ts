import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class GetPcasByCustomerUseCase {
  async execute(page: puppeteer.Page): Promise<void> {
    await this.openPca(page);
  }

  private async openPca(page: puppeteer.Page): Promise<void> {
    const linkSelector =
      'a.text-decoration-none[href^="/Transparencia/Orgao/"]';
    const linkElement = await page.$(linkSelector);
    console.log(linkElement);

    if (linkElement) {
      await linkElement.click();
      await page.waitForNavigation();
    }
    const header = await page.$$eval('th.px-3', (ths) =>
      ths.map((th) => th.textContent.trim()),
    );
    console.log('Conteúdo dos elementos <tr>:', header);
    const tdElements = await page.$$eval('td.px-3.align-middle', (tds) =>
      tds.map((td) => td.textContent.trim()),
    );

    // Exibir os resultados no console
    console.log('Conteúdo dos elementos <td>:', tdElements);
  }
}
