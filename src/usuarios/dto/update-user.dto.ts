import { Type } from 'class-transformer';
import { IsBoolean, IsEmpty, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class UpdateUserDto {
  @IsString({ message: 'name debe ser un texto' })
  @IsNotEmpty({ message: 'name es obligatorio' })
  user: string;

  @IsString({ message: 'password debe ser un texto' })
  @IsOptional({ message: 'password es opcional' })
  password: string;
}
