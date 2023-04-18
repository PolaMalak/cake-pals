import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ allowedHeaders: '*', origin: '*' });
  const config = new DocumentBuilder()
    .setTitle('Cake-Pals API')
    .setDescription('Cake-Pals API description')
    .setVersion('1.0')
    .addTag('api')
    .setExternalDoc('postman collection', 'v1-json')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1', app, document);

  await app.listen(3000);
}
bootstrap();
