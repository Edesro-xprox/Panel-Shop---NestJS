import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller.js';
import { ProductsService } from './products.service.js';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema.js';

// Un Módulo agrupa todo lo de un recurso: controlador + servicio.
// Para agregar otro recurso (ej: suppliers), creas otra carpeta igual
// y la importas en app.module.ts. Así escala el proyecto.
@Module({
  imports: [ 
    MongooseModule.forFeature([
      {
        name: Product.name, //Sirve para registrar el modelo de Mongoose con un nombre que luego para inyectarlo en tus servicios y controladores
        schema: ProductSchema,
      },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
