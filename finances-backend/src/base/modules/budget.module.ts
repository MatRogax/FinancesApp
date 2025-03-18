import { Module } from '@nestjs/common';
import { BudgetRepository } from '@repositories/budget.repository';
import { BudgetController } from '@controllers/budget.controller';
import { PrismaModule } from '@modules/prisma.module';
import { AbstractBudgetRepository } from '@repositories/abstract-budget.repository';

@Module({
  imports: [PrismaModule],
  controllers: [BudgetController],
  providers: [{ provide: AbstractBudgetRepository, useClass: BudgetRepository },
  ],
  exports: [AbstractBudgetRepository],
})
export class BudgetModule { }

