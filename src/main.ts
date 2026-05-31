import {
  ValidationPipe,
} from '@nestjs/common';

import { NestFactory } from '@nestjs/core';

import * as express from 'express';

import { join } from 'path';

import { AppModule } from './app.module';

import { PrismaService } from './prisma/prisma.service';
import {
  SwaggerModule,
  DocumentBuilder,
} from '@nestjs/swagger';

import { HttpExceptionFilter }
from './common/filters/http-exception.filter';

import { ResponseInterceptor }
from './common/interceptors/response.interceptor';




async function bootstrap() {
  const app =
    await NestFactory.create(
      AppModule,
    );

  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.use(
    '/uploads',
    express.static(
      join(
        process.cwd(),
        'uploads',
      ),
    ),
  );

  const prisma =
    app.get(
      PrismaService,
    );

    const swaggerConfig =
  new DocumentBuilder()
    .setTitle(
      'Fashion Ecommerce API',
    )
    .setDescription(
      'NestJS + Prisma Ecommerce API',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

const document =
  SwaggerModule.createDocument(
    app,
    swaggerConfig,
  );

SwaggerModule.setup(
  'docs',
  app,
  document,
); 


app.useGlobalFilters(
  new HttpExceptionFilter(),
);

app.useGlobalInterceptors(
  new ResponseInterceptor(),
);

  await prisma.enableShutdownHooks(
    app,
  );

  await app.listen(
    process.env.PORT || 3000,
  );
}

bootstrap();