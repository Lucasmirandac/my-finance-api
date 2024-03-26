// create-transaction.dto.ts
import {
  IsNotEmpty,
  IsNumber,
  IsDateString,
  IsBoolean,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsNumber()
  value: number;

  @IsNotEmpty()
  @IsDateString()
  date: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  tag: string;

  @IsOptional()
  @IsBoolean()
  creditPayment?: boolean;

  @IsOptional()
  @IsBoolean()
  installment?: boolean;

  @IsOptional()
  @IsNumber()
  totalInstallments?: number;

  @IsOptional()
  @IsNumber()
  currentInstallment?: number;
}
