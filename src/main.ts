import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import 'dotenv/config';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  const apiPrefix = process.env.API_PREFIX ?? '';
  const swaggerPrefix = process.env.SWAGGER_PREFIX ?? 'swagger';
  const port = process.env.PORT ?? 3000;

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
