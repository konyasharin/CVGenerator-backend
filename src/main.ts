import { BaseException } from '@common/exceptions';
import { HttpExceptionFilter, ResponseInterceptor } from '@modules/app';
import { HttpStatus, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import 'dotenv/config';

import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  const apiPrefix = process.env.API_PREFIX ?? '';
  const swaggerPrefix = process.env.SWAGGER_PREFIX ?? 'swagger';
  const port = process.env.PORT ?? 3000;

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        return new BaseException(
          errors.length
            ? errors.reduce((acc, error) => {
                if (error.constraints)
                  return [...acc, ...Object.values(error.constraints)];
                return acc;
              }, [])
            : 'Validation error',
          HttpStatus.BAD_REQUEST,
        );
      },
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.setGlobalPrefix(apiPrefix);

  const config = new DocumentBuilder()
    .setTitle('CVGenerator API')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(swaggerPrefix, app, documentFactory);

  await app.listen(port ?? 3000);

  logger.log(`Server started at http://localhost:${port}`);
  logger.log(
    `Api available at http://localhost:${port}/${apiPrefix ? `${apiPrefix}/` : ''}`,
  );
  logger.log(`Swagger available at http://localhost:${port}/${swaggerPrefix}/`);
}
bootstrap();
