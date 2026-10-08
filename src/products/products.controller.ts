import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { UpdateProductStatusDto } from './dto/update-product-status.dto.js';
import { ProductsService } from './products.service.js';
import type { UploadedProductImage } from './uploaded-product-image.js';

// @Controller('products') => todas las rutas empiezan con /products
// El controlador NO tiene lógica, solo delega al servicio.
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // GET /products -> lista todos los productos
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  // GET /products/:id -> un producto (útil para editar en el frontend)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  // POST /products -> crear producto. Responde 201.
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(
    FileInterceptor('image', {
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (_request, file, callback) => {
        if (!['image/jpg', 'image/jpeg'].includes(file.mimetype)) {
          callback(new BadRequestException('La imagen debe ser formato JPG o JPEG'), false);
          return;
        }
        callback(null, true);
      },
    }),
  )
  create(@Body() dto: CreateProductDto, @UploadedFile() image?: UploadedProductImage) {
    console.log('image', image);
    return this.productsService.create(dto, image);
  }

  // PUT /products/:id -> modifica los datos; image es opcional.
  @Put(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (_request, file, callback) => {
        if (!['image/jpg', 'image/jpeg'].includes(file.mimetype)) {
          callback(new BadRequestException('La imagen debe ser formato JPG o JPEG'), false);
          return;
        }
        callback(null, true);
      },
    }),
  )
  update(@Param('id') id: string, @Body() dto: UpdateProductDto, @UploadedFile() image?: UploadedProductImage) {
    console.log('image', image); 
    return this.productsService.update(id, dto, image);
  }

  // PATCH /products/:id/:status -> solo cambia la vigencia (status true/false)
  // Body: { "status": false }
  @Patch(':id/:status')
  updateStatus(@Param('id') id: string, @Param('status') status: boolean) {
    return this.productsService.updateStatus(id, status);
  }
}
