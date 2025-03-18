import { PartialType } from '@nestjs/swagger';
import { BudgetDTO } from './create-budget.dto';


export class UpdateBudgetDto extends PartialType(BudgetDTO) { }
