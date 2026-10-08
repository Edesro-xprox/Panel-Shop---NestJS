import { Type } from 'class-transformer';
import { IsBoolean, IsEmpty, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
// DTO = Data Transfer Object.
// Define qué datos acepta el POST /products y los valida automáticamente.
// Si algo falla, Nest responde 400 con el detalle.

export class CreateProductDto {
  @IsString({ message: 'name debe ser un texto' })
  @IsNotEmpty({ message: 'name es obligatorio' })
  name: string;

  @Type(() => File)
  @IsOptional({ message: 'image no es obligatorio' })
  image: File;

  @IsString({ message: 'description debe ser un texto' })
  @IsNotEmpty({ message: 'description es obligatoria' })
  description: string;

  @Type(() => Number)
  @IsNumber({}, { message: 'price debe ser un número' })
  @Min(0, { message: 'price no puede ser negativo' })
  price: number;

  @IsString({ message: 'supplier debe ser un texto' })
  @IsOptional({ message: 'supplier es obligatorio' })
  supplier: string;

  @IsString({ message: 'type debe ser un texto' })
  @IsNotEmpty({ message: 'type es obligatorio' })
  type: string;
}
