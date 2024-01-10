import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { PcaCrawlerModule } from '../crawlers/pca/pca-crawler.module';

@Module({
  imports: [PcaCrawlerModule],
  providers: [SchedulerService],
})
export class SchedulerModule {}