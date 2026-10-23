import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ProductsModule } from './products/products.module.js';
import { UsersModule } from './usuarios/users.module.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

/*
  Considerar que cuando se ejecuta pnpm start, la app no detectará cambios y no reiniciará el servidor
  a diferencia si se ejecuta pnpm start:dev
*/

/*
  El driver mongoDB y el módulo Mongoose son diferentes, el driver te permite comunicarte diectamente con la base de datos y
  el ODM (Object Document Mapper) Mongoose agrega una capa de abstracción para organizar datos mediante esquemas, modelos y validaciones
*/

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],

      inject: [ConfigService],

      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
    }),
    ProductsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
