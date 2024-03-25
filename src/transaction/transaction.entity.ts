// transaction.entity.ts
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  BeforeInsert,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  value: number;

  @Column({ type: 'date' })
  date: Date;

  @Column()
  tag: string;

  @Column({ default: false })
  creditPayment: boolean;

  @Column({ default: false })
  installment: boolean;

  @Column({ nullable: true })
  totalInstallments: number;

  @Column({ nullable: true })
  currentInstallment: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.transactions)
  user: User;

  // Gerar UUID automaticamente antes de salvar
  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
