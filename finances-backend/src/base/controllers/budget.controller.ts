import { CreateBudgetDto } from '@dtos/create-budget.dto';
import { Controller, Post, Body, Get, Put, Headers, Delete } from '@nestjs/common';
import { Budget } from '@prisma/client';
import { AbstractBudgetRepository } from '@repositories/abstract-budget.repository';

@Controller('budget')
export class BudgetController {
  constructor(private readonly budgetRepository: AbstractBudgetRepository) { }

  @Post('create-budget')
  async create(@Body() budget: CreateBudgetDto): Promise<Budget> {
    const created = await this.budgetRepository.createBudget(budget);
    return created;
  }

  @Get('all-budgets')
  async getAll(): Promise<Budget[]> {
    const budgets = await this.budgetRepository.getAllBudgets();
    return budgets;
  }

  @Put('upgrade-budget')
  async upgradeBudget(@Headers('id') id: number, @Body() budget: CreateBudgetDto): Promise<Budget> {
    const updated = await this.budgetRepository.updateBudget(id, budget);
    return updated;
  }

  @Delete('deleter-budget')
  async deleteBudget(@Headers('id') id: number): Promise<void> {
    await this.budgetRepository.deleteBudget(id);
  }

  @Get(':id')
  async getBudget(@Headers('id') id: number): Promise<Budget> {
    const budget = await this.budgetRepository.findBudgetByid(id);
    return budget;
  }
}
