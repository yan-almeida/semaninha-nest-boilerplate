import { ApiProperty } from '@nestjs/swagger';

export class ProdutoDto {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
  })
  id: string;

  @ApiProperty()
  titulo: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  categoriaTitulo: string;
}
