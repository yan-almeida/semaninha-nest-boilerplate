import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import slugify from 'slugify';
import { CategoriasService } from 'src/categorias/categorias.service';
import { Categoria } from 'src/categorias/entities/categoria.entity';
import { AppMessage } from 'src/common/appMessage.common';
import { Repository } from 'typeorm';
import { validate } from 'uuid';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Produto } from './entities/produto.entity';

@Injectable()
export class ProdutosService {
  constructor(
    @InjectRepository(Produto)
    private readonly _produtoRepository: Repository<Produto>,
    private readonly _categoriasService: CategoriasService,
  ) {}

  async create(dto: CreateProdutoDto): Promise<Produto | AppMessage> {
    const categoria = await this._categoriasService.findOne(dto.idCategoria);

    if (!categoria) {
      return { message: ['Categoria não existe! Tente outro id.'] };
    }

    const produto = new Produto(dto.titulo, categoria);

    const produtoCriado = await this._produtoRepository.save(produto);

    return produtoCriado;
  }

  findAll() {
    return this._produtoRepository.find({
      relations: ['categoria'],
    });
  }

  async findOne(uuidOrSlug: string) {
    const where = validate(uuidOrSlug)
      ? { id: uuidOrSlug }
      : { slug: uuidOrSlug };

    const produto = await this._produtoRepository.findOne({
      where,
      relations: ['categoria'],
    });
    return produto;
  }

  async update(
    id: string,
    dto: UpdateProdutoDto,
  ): Promise<Produto | AppMessage> {
    const messages: string[] = [];

    const categoria = await this._categoriasService.findOne(dto.idCategoria);

    if (!categoria) {
      messages.push('Categoria não existe! Tente outro id.');
    }

    const produtoExiste = await this.findOne(id);

    if (!produtoExiste) {
      messages.push('Produto não existe! Tente outro id.');
    }

    if (messages.length !== 0) {
      return { message: messages };
    }

    const produto = {
      ...dto,
      slug: slugify(dto.titulo.trim().toLocaleLowerCase()),
      categoria,
    };

    await this._produtoRepository.save({ id, ...produto });

    const produtoAtualizado = await this.findOne(id);

    return produtoAtualizado;
  }

  remove(id: number) {
    return `This action removes a #${id} produto`;
  }
}
