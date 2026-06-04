import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global validation pipe configuration
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Security middleware
  app.use(helmet());

  // CORS policy configuration
  app.enableCors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
  });

  // Start the server
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();