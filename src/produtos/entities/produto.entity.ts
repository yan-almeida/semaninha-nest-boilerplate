import slugify from 'slugify';
import { Categoria } from 'src/categorias/entities/categoria.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity()
export class Produto {
  constructor(titulo: string, categoria: Categoria) {
    this.id = uuid();

    this.createdAt = new Date();

    if (titulo) {
      this.titulo = titulo.trim();

      this.slug = slugify(titulo.trim().toLocaleLowerCase());
    }

    if (categoria && categoria.id) {
      this.categoria = categoria;
    }
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  titulo: string;

  @Column({ nullable: true })
  slug: string;

  @ManyToOne(() => Categoria, (categoria) => categoria.produtos)
  @JoinColumn()
  categoria: Categoria;
}
