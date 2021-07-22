import { BaseEntity } from 'src/common/baseEntity.common';
import { Column, Entity } from 'typeorm';

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
}
