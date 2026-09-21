import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { envSchemaValidation } from './common/configurations/env-schema-validation';
import configMapping from './common/configurations/config-mapping';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: envSchemaValidation,
      load: [configMapping],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
