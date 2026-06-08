import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new I18nValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  app.useGlobalFilters(
    new I18nValidationExceptionFilter({
      detailedErrors: false, // ← set true only for debugging
    })
  );

  app.use(helmet());

  app.enableCors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();