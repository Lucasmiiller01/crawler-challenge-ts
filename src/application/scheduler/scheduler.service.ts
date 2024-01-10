import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PcaCrawlerService } from '../crawlers/pca/pca-crawler.service';

@Injectable()
export class SchedulerService {
  constructor(private readonly pcaCrawlerService: PcaCrawlerService) {}
  onModuleInit() {
    // Executar imediatamente no início
    this.runCrawlerJob();
  }
  @Cron(CronExpression.EVERY_10_MINUTES)
  async runCrawlerJob() {
    console.log('Executing crawler job...');
    await this.pcaCrawlerService.runCrawler();
  }
}