import { Module } from '@nestjs/common';
import { UsersController } from './users.controller.js';
import { UsersService } from './users.service.js';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema.js';

// Un Módulo agrupa todo lo de un recurso: controlador + servicio.
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name, //Sirve para registrar el modelo de Mongoose con un nombre que luego para inyectarlo en tus servicios y controladores
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
