// transaction.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { CreateTransactionDto } from './dtos/create-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async findAll(): Promise<Transaction[]> {
    return this.transactionRepository.find();
  }

  async findOne(id: string): Promise<Transaction> {
    return this.transactionRepository.findOne({ where: { id: id } });
  }

  async create(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    const newTransaction =
      this.transactionRepository.create(createTransactionDto);
    return this.transactionRepository.save(newTransaction);
  }

  async update(
    id: string,
    updateTransactionDto: Partial<CreateTransactionDto>,
  ): Promise<Transaction> {
    const transaction = await this.transactionRepository.findOne({
      where: { id: id },
    });
    if (!transaction) {
      throw new Error('Transaction not found');
    }
    Object.assign(transaction, updateTransactionDto);
    return this.transactionRepository.save(transaction);
  }

  async remove(id: string): Promise<void> {
    const transaction = await this.transactionRepository.find({
      where: { id: id },
    });
    if (!transaction) {
      throw new Error('Transaction not found');
    }
    await this.transactionRepository.remove(transaction);
  }
}
