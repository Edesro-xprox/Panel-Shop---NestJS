import { Type } from 'class-transformer';
import { IsEmpty, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

// DTO para PUT /products/:id.
// PUT = reemplazo completo del producto (menos _id y status).
// Por eso todos los campos son obligatorios.
// La imagen no forma parte del DTO: solo se cambia si se adjunta un archivo.
// El status NO va aquí: se cambia solo con PATCH /products/:id/status.

export class UpdateProductDto {
  @IsString({ message: 'name debe ser un texto' })
  @IsNotEmpty({ message: 'name es obligatorio' })
  name: string;

  @Type(() => File )
  @IsOptional({ message: 'image no es obligatorio' })
  image: File;

  @IsString({ message: 'type debe ser un texto' })
  @IsNotEmpty({ message: 'type es obligatorio' })
  type: string;

  @IsString({ message: 'description debe ser un texto' })
  @IsNotEmpty({ message: 'description es obligatoria' })
  description: string;

  @Type(() => Number)
  @IsNumber({}, { message: 'price debe ser un número' })
  @Min(0, { message: 'price no puede ser negativo' })
  price: number;

  @IsString({ message: 'supplier debe ser un texto' })
  @IsOptional({ message: 'supplier no es obligatorio' })
  supplier: string;
}
