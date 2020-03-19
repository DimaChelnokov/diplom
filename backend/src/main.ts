import "reflect-metadata";
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Diplom backend')
    .setDescription('Diplom backend API description')
    .setVersion('0.0.1')
    .addTag('diplom')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);  

  app.enableCors();
  await app.listen(3000);
}
bootstrap();
