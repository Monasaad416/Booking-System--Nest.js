import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { I18nValidationPipe } from 'nestjs-i18n';
import { CustomExceptionFilter } from './common/errorHandling/filters/custom-exception.filter';
import { SwaggerConfig } from './common/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');

  app.useGlobalPipes(
    new I18nValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true, //if the user sends a field that is not in the whitelist, it will throw an error
      transform: true,
    }),
  );
  app.useGlobalFilters(new CustomExceptionFilter());

  SwaggerConfig.setup(app);

  await app.listen(port ?? 3000);
}
void bootstrap();
