import { Get, Post, Body, Param, Delete, Res, Put } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { ApiController } from 'src/decorators/apiController.decorator';
import { Response } from 'express';
import { Produto } from './entities/produto.entity';
import { ProdutoDto } from './dto/produto.dto';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

@ApiController('produtos')
export class ProdutosController {
  constructor(private readonly _produtosService: ProdutosService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Criação de Produto',
    type: ProdutoDto,
  })
  async create(
    @Body() createProdutoDto: CreateProdutoDto,
    @Res() res: Response,
  ) {
    const result = await this._produtosService.create(createProdutoDto);

    if (result instanceof Produto) {
      const produtoCriado: ProdutoDto = {
        id: result.id,
        titulo: result.titulo,
        slug: result.slug,
        categoriaTitulo: result.categoria.titulo,
      };

      return res.created(produtoCriado);
    }

    return res.notFound(result);
  }

  @Get()
  @ApiOkResponse({
    description: 'Listagem de todos os Produtos',
    type: [ProdutoDto],
  })
  async findAll(@Res() res: Response) {
    const result = await this._produtosService.findAll();

    if (Array.isArray(result) && result.length !== 0) {
      const produtos: ProdutoDto[] = [];

      for (const item of result) {
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

    return res.notFound();
  }

  @Get(':uuidOrSlug')
  @ApiOkResponse({
    description: 'Listagem de um único Produto',
    type: ProdutoDto,
  })
  async findOne(@Param('uuidOrSlug') uuidOrSlug: string, @Res() res: Response) {
    const result = await this._produtosService.findOne(uuidOrSlug);

    if (result instanceof Produto) {
      const produto: ProdutoDto = {
        id: result.id,
        titulo: result.titulo,
        slug: result.slug,
        categoriaTitulo: result.categoria.titulo,
      };

      return res.ok(produto);
    }

    return res.notFound();
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateProdutoDto,
    @Res() res: Response,
  ) {
    const result = await this._produtosService.update(id, dto);

    if (result instanceof Produto) {
      const produto: ProdutoDto = {
        id: result.id,
        titulo: result.titulo,
        slug: result.slug,
        categoriaTitulo: result.categoria.titulo,
      };

      return res.ok(produto);
    }

    return res.notFound(result);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    return this._produtosService.remove(+id);
  }
}
