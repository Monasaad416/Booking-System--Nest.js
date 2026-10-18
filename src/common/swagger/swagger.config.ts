import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerApiTags } from './constants';

export class SwaggerConfig {
  static setup(app: INestApplication): void {
    const config = new DocumentBuilder()
      .setTitle('Booking System API')
      .setDescription('Booking System API description')
      .setVersion('1.0')
      .addTag(SwaggerApiTags.AUTH)
      .addTag(SwaggerApiTags.USERS)
      .addTag(SwaggerApiTags.BOOKINGS)
      .addTag(SwaggerApiTags.COUNTRIES)
      .addTag(SwaggerApiTags.CITIES)
      .build();

    const documentFactory = () => SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api', app, documentFactory, {
      swaggerOptions: {
        filter: true,
        displayRequestDuration: true,
      },
    });
  }
}
