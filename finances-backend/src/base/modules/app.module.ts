import { Module } from '@nestjs/common';
import { BudgetModule } from './budget.module';

@Module({
  imports: [],
  controllers: [],
  providers: [BudgetModule],
})
export class AppModule { }
