import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppMessage } from 'src/common/appMessage.common';
import { Repository } from 'typeorm';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './entities/categoria.entity';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private readonly _categoriaRepository: Repository<Categoria>,
  ) {}

  async create(dto: CreateCategoriaDto) {
    const categoria = new Categoria(dto.titulo);

    const categoriaCriada = await this._categoriaRepository.save(categoria);

    return categoriaCriada;
  }

  findAll() {
    return this._categoriaRepository.find();
  }

  findOne(id: number) {
    return this._categoriaRepository.findOne(id);
  }

  async update(
    id: number,
    dto: UpdateCategoriaDto,
  ): Promise<Categoria | AppMessage> {
    const categoria = await this.findOne(id);

    if (!categoria) {
      return {
        message: ['Categoria não existe! Tente outro id.'],
      };
    }

    await this._categoriaRepository.save({ id, ...dto });

    const categoriaAtualizada = await this.findOne(id);

    return categoriaAtualizada;
  }

  async remove(id: number): Promise<AppMessage | null> {
    const categoria = await this.findOne(id);

    if (!categoria) {
      return {
        message: ['Categoria não existe! Tente outro id.'],
      };
    }

    await this._categoriaRepository.delete(id);

    return null;
  }
}
