import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from '~/app/app.module';
import { INestConfig } from '~/configs/config.interface';

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const nestConfig = configService.get<INestConfig>('nest')!;

  app.setGlobalPrefix(nestConfig?.globalPrefix);
  app.enableShutdownHooks();

  const port = nestConfig.port;
  await app.listen(nestConfig.port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}
