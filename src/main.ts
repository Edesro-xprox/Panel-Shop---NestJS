import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Activa la validación automática de los DTOs en toda la API:
  // - whitelist: ignora campos extra que no estén en el DTO
  // - forbidNonWhitelisted: rechaza con 400 si envían campos extra
  // - transform: convierte tipos (ej: "123" -> 123 si es posible)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors();

  await app.listen(3001);
}
await bootstrap();
