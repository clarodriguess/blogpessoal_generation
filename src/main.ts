import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //doc swagger
  const config = new DocumentBuilder()
  .setTitle('Blog Pessoal')
  .setDescription('Projeto Blog Pessoal')
  .setContact("Clarisse Rodrigues","https://github.com/clarodriguess","clarissebleasby@gmail.com")
  .setVersion('1.0')
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  //hora local
  process.env.TZ = '-03:00';

  //validar biblioteca
  app.useGlobalPipes(new ValidationPipe());
  
  //para aceitar requisições de outros domínios
  app.enableCors();

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
