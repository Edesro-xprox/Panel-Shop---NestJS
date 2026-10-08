import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller.js';
import { ProductsService } from './products.service.js';
import { MongooseModule } from '@nestjs/mongoose';
import { Product } from './entities/product.entity.js';
import { ProductSchema } from './schemas/product.schema.js';

// Un Módulo agrupa todo lo de un recurso: controlador + servicio.
// Para agregar otro recurso (ej: suppliers), creas otra carpeta igual
// y la importas en app.module.ts. Así escala el proyecto.
@Module({
  imports: [ 
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
