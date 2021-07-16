import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { DatabaseExceptionFilter } from './filters/databaseException.filter';
import { responseMiddleware } from './middlewares/response.middleware';

async function bootstrap() {
  const logger = new Logger('MainApi');

  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalFilters(new DatabaseExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('/v1/api');

  const config = new DocumentBuilder()
    .setTitle('WEB API - semaninha nest')
    .setDescription('API responsável: **')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.use(responseMiddleware);
  app.enableCors();

  await app.listen(process.env.PORT || 3333);
  const url = await app.getUrl();

  logger.debug(`Swagger application is running on: ${url}/swagger`);
}

bootstrap();
