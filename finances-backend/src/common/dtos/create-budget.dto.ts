import { BudgetType } from '@prisma/client';
import { IsString, IsDecimal, IsEnum } from 'class-validator';

export class BudgetDTO {

    @IsString()
    userId!: string;

    @IsString()
    name!: string;

    @IsDecimal()
    value!: number;

    @IsEnum(BudgetType)
    type!: BudgetType;

}
