import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { getConfig } from './infrastructure/database/typeorm.config';
import { SchedulerModule } from './application/scheduler/scheduler.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot(getConfig()),
    SchedulerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
