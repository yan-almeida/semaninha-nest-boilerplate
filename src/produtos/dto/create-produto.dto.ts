import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, IsNumber } from 'class-validator';

export class CreateProdutoDto {
  @ApiProperty()
  @IsString({ message: 'Título inválido.' })
  @MinLength(2, { message: 'Título precisa de, no mínimo, 2 caracteres.' })
  @MaxLength(255, { message: 'Título precisa de, no máximo, 255 caracteres.' })
  titulo: string;

  @ApiProperty()
  @IsNumber({}, { message: 'Id categoria inválido.' })
  idCategoria: number;
}
