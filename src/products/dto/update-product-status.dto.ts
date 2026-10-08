import { IsBoolean, IsNotEmpty } from 'class-validator';

// DTO para PATCH /products/:id/status.
// PATCH = cambio parcial. Aquí solo se permite cambiar la vigencia (status).

export class UpdateProductStatusDto {
  @IsNotEmpty({ message: 'status es obligatorio' })
  @IsBoolean({ message: 'status debe ser true (vigente) o false (no vigente)' })
  status: boolean;
}
