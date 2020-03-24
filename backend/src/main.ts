import "reflect-metadata";
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from "@nestjs/platform-express";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );

  const options = new DocumentBuilder()
    .setTitle('Diplom backend')
    .setDescription('Diplom backend API description')
    .setVersion('0.0.1')
    .addTag('diplom')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/swagger', app, document);  

  app.useStaticAssets(join(__dirname, '/../public'), {prefix: '/'});
  
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
