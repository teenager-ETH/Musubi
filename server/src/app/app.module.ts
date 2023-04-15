import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from '~/app/app.controller';
import { config } from '~/configs';
import { AppService } from './app.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
