import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export function getConfig(): TypeOrmModuleOptions {
  const isProduction = process.env.NODE_ENV === 'production';
  return {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME || 'user',
    password: process.env.DB_PASSWORD || 'pass',
    database: process.env.DB_NAME || 'db',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: !isProduction,
  };
}