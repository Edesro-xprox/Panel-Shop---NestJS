import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { Product } from './schemas/product.schema.js';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import type { UploadedProductImage } from './uploaded-product-image.js';
import { del, put } from '@vercel/blob';

// @Injectable() le dice a Nest que esta clase se puede inyectar
// en el controlador (inyección de dependencias).
// Toda la lógica de negocio vive aquí, el controlador solo rutea.
@Injectable()
export class ProductsService {
  // Almacén en memoria. Map<id, producto>.
  // Cuando conectes una BD, solo cambias el interior de estos métodos.
  @InjectModel(Product.name)
  private readonly products: Model<Product>;

  async findAll() {
    return await this.products.find();
  }

  async findOne(id: string) {
    const product = await this.products.findById(id);
    if (!product) {
      throw new NotFoundException(`Producto con id "${id}" no encontrado`);
    }
    return product;
  }

  async create(dto: CreateProductDto, image?: UploadedProductImage) {
    if (!image) {
      throw new BadRequestException('Debes adjuntar una imagen en el campo image');
    }
    const allProducts = await this.findAll();
    
    const newId = "prod_" + (Number(
      allProducts
                    .sort((p1, p2) => Number(p2._id.split('_')[1]) - Number(p1._id.split('_')[1]))[0]
                    ._id.split('_')[1]
    ) + 1).toString().padStart(3, '0'); 
    
    const { name } = await this.saveImage(image, dto.type); 

    const product = {
      _id: newId,
      name: dto.name,
      image: name, 
      type: dto.type,
      description: dto.description,
      price: dto.price,
      supplier: dto.supplier,
      status: true,
    };

    try {
      return await this.products.create(product);
    } catch (error) {
      await del(name);
      throw error;
    }
  }

  // PUT: reemplaza los campos editables, conserva _id y status.
  async update(id: string, dto: UpdateProductDto, image?: UploadedProductImage) {
    const current = await this.findOne(id); // lanza 404 si no existe
    console.log('current', current);
    const blob = image ? await this.saveImage(image, dto.type) : undefined;
    console.log('llegue hasta aquí');
    let updated;
    console.log('name', blob?.name);
    try {
      updated = await this.products.findByIdAndUpdate(
        id,
        {
          name: dto.name,
          ...(blob?.name ? { image: blob.name } : {}),
          type: dto.type,
          description: dto.description,
          price: dto.price,
          supplier: dto.supplier,
        },
        { new: true },
      );
      if (!updated) {
        throw new NotFoundException(`Producto con id "${id}" no encontrado`);
      }
    } catch (error) {
      if (blob?.url) await del(blob.url);
      throw error;
    }

    if (blob?.name && current.image !== blob.name) {
      await del(current.image);
    }
    return updated;
  }

  private async saveImage(image: UploadedProductImage, type: string) {
    console.log('image');
    const extensionByMimeType: Record<string, string> = {
      'image/jpeg': '.jpeg',
      'image/jpg': '.jpg',
    };
    const extension = extensionByMimeType[image.mimetype];
    if (!extension) {
      throw new BadRequestException('La imagen debe ser formato JPG o JPEG');
    }

    const filename = `${uuidv4()}${extension}`;
    console.log('filename', filename);
    
    const pathname = `${type}/${filename}`;

    const blob = await put(pathname, image.buffer, { access: 'public', contentType: image.mimetype });
    console.log('blob', blob);
    return { url: blob.url, name: blob.pathname.split('/')[1] };
  }

  // PATCH /products/:id/:status: solo cambia la vigencia.
  async updateStatus(id: string, status: boolean) {
    return await this.products.findByIdAndUpdate(id, { status }, { new: true });
  }
}
