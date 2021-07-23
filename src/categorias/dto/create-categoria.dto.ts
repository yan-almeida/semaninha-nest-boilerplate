import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCategoriaDto {
  @ApiProperty()
  @IsString({ message: 'Título inválido.' })
  @MinLength(2, { message: 'Título precisa de, no mínimo, 2 caracteres.' })
  @MaxLength(255, { message: 'Título precisa de, no máximo, 255 caracteres.' })
  titulo: string;
}
