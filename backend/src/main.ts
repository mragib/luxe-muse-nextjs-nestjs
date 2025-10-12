import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import compression from 'compression';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.use(
    compression({
      filter: () => {
        return true;
      },
      threshold: 0,
    }),
  );

  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
