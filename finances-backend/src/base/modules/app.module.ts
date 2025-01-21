import { Module } from '@nestjs/common';
import { BudgetModule } from './budget.module';
import { UserModule } from './user.module';

@Module({
  imports: [BudgetModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
