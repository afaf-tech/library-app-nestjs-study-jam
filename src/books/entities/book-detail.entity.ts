import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BookEntity } from './book.entity';

@Entity({ name: 'book_details' })
export class BookDetailEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: string;

  @Column()
  price: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;

  @OneToOne(() => BookEntity)
  @JoinColumn()
  profile: BookEntity;
}
