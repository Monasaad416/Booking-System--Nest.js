import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {
  I18nModule,
  AcceptLanguageResolver,
  QueryResolver,
  HeaderResolver,
} from 'nestjs-i18n';
import { join } from 'path';
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
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        fallbackLanguage: configService.getOrThrow<string>('fallbackLanguage'),
        loaderOptions: {
          path: join(__dirname, 'i18n'),
          watch: true,
        },
      }),
      inject: [ConfigService],

      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        new HeaderResolver(['x-lang']),
        AcceptLanguageResolver,
      ],
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.getOrThrow<string>('mongodbUri'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class CoreModule {}
