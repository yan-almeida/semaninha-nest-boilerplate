import { BaseEntity } from 'src/common/baseEntity.common';
import { Produto } from 'src/produtos/entities/produto.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Categoria extends BaseEntity {
  constructor(titulo: string) {
    super();

    if (titulo) {
      this.titulo = titulo.trim();
    }
  }

  @Column()
  titulo: string;

  @OneToMany(() => Produto, (produto) => produto.categoria)
  produtos: Produto[];
}
