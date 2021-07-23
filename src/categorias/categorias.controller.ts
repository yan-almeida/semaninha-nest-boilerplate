import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  ParseIntPipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Response } from 'express';
import { ApiController } from 'src/decorators/apiController.decorator';
import { ProdutoDto } from 'src/produtos/dto/produto.dto';
import { CategoriasService } from './categorias.service';
import { CategoriaDto } from './dto/categoria.dto';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './entities/categoria.entity';

@ApiController('categorias')
export class CategoriasController {
  constructor(private readonly _categoriasService: CategoriasService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Criação de Categoria',
    type: CategoriaDto,
  })
  async create(@Body() dto: CreateCategoriaDto, @Res() res: Response) {
    const result = await this._categoriasService.create(dto);

    if (result instanceof Categoria) {
      const categoria: CategoriaDto = {
        id: result.id,
        titulo: result.titulo,
      };

      return res.created(categoria);
    }

    return res.badRequest();
  }

  @Get()
  @ApiOkResponse({
    description: 'Listagem de todas as Categorias',
    type: [CategoriaDto],
  })
  async findAll(@Res() res: Response) {
    const result = await this._categoriasService.findAll();

    if (Array.isArray(result) && result.length !== 0) {
      const categorias: CategoriaDto[] = [];

      for (const item of result) {
        const categoria: CategoriaDto = {
          id: item.id,
          titulo: item.titulo,
        };

        categorias.push(categoria);
      }

      return res.ok(categorias);
    }

    return res.notFound();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Listagem de uma Categoria',
    type: CategoriaDto,
  })
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const result = await this._categoriasService.findOne(+id);

    if (result instanceof Categoria) {
      const categoria: CategoriaDto = {
        id: result.id,
        titulo: result.titulo,
      };

      return res.ok(categoria);
    }

    return res.notFound();
  }

  @Get(':id/produtos')
  @ApiOkResponse({
    description: 'Listagem de Prodtuos de uma Categoria',
    type: [ProdutoDto],
  })
  async findOneProdutosCategoria(
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    const result = await this._categoriasService.findOneProdutosCategoria(+id);

    if (result instanceof Categoria) {
      if (Array.isArray(result.produtos) && result.produtos.length !== 0) {
        const produtos: ProdutoDto[] = [];

        for (const item of result.produtos) {
          const produto: ProdutoDto = {
            id: item.id,
            titulo: item.titulo,
            slug: item.slug,
            categoriaTitulo: item.categoria.titulo,
          };

          produtos.push(produto);
        }

        return res.ok(produtos);
      }

      return res.notFound({
        message: ['Nenhum produto cadastrado para esta categoria.'],
      });
    }

    return res.notFound();
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'Atualização de uma Categoria',
    type: CategoriaDto,
  })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateCategoriaDto,
    @Res() res: Response,
  ) {
    const result = await this._categoriasService.update(+id, dto);

    if (result instanceof Categoria) {
      const categoria: CategoriaDto = {
        id: result.id,
        titulo: result.titulo,
      };

      return res.ok(categoria);
    }

    return res.notFound();
  }

  @Delete(':id')
  @ApiNoContentResponse({ description: 'Deleção de categoria' })
  async remove(@Param('id') id: string, @Res() res: Response) {
    const result = await this._categoriasService.remove(+id);

    if (!result) {
      return res.noContent();
    }

    return res.notFound(result);
  }
}
