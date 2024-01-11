import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PcaCrawlerService } from '../crawlers/pca/pca-crawler.service';

@Injectable()
export class SchedulerService {
  constructor(private readonly pcaCrawlerService: PcaCrawlerService) {}
  onModuleInit() {
    // Executar imediatamente no início
    this.runCrawlerJob();
  }
  // Rodar a cada 1 minuto
  @Cron("0 */1 * * * *")
  async runCrawlerJob() {
    console.log('Executing crawler job...');
    await this.pcaCrawlerService.runCrawler();
  }
}