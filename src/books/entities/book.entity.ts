import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'books' })
export class BookEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  publisher: string;

  @Column({ length: 1000 })
  description: string;
}
