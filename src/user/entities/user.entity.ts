// user.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  OneToMany,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { UserTag } from './user-tag.entity';
import { Budget } from 'src/budget/budget.entity';
import { Transaction } from 'src/transaction/transaction.entity';
import { Tag } from 'src/transaction/tag.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  fullName: string;

  @Column({ nullable: true })
  dateOfBirth: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: string;

  @ManyToMany(() => Tag, (tag) => tag.users)
  @JoinTable()
  userTags: UserTag[];

  @OneToOne(() => Budget, { cascade: true })
  @JoinColumn()
  budget: Budget;

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Transaction[];

  // Gerar UUID automaticamente antes de salvar
  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = uuid();
    }
  }

  @BeforeInsert()
  setCreateDate() {
    if (!this.createdAt) {
      this.createdAt = Date.now().toString();
    }
  }
}
