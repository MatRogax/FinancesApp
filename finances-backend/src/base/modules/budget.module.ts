import { Module } from '@nestjs/common';
import { BudgetRepository } from '@repositories/budget.repository';
import { BudgetController } from '@controllers/budget.controller';
import { PrismaModule } from '@modules/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BudgetController],
  providers: [BudgetRepository],
})
export class BudgetModule { }
