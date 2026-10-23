import { Type } from 'class-transformer';
import { IsBoolean, IsEmpty, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'name debe ser un texto' })
  @IsNotEmpty({ message: 'name es obligatorio' })
  user: string;

  @IsString({ message: 'name debe ser un texto' })
  @IsNotEmpty({ message: 'password es obligatorio' })
  password: string;
}
