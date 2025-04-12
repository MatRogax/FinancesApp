import { BudgetDTO } from '@dtos/create-budget.dto';
import { UpdateBudgetDto } from '@dtos/update-budget.dto';
import { Controller, Post, Body, Get, Put, Delete, Param } from '@nestjs/common';
import { Budget } from '@prisma/client';
import { AbstractBudgetRepository } from '@repositories/abstract-budget.repository';

@Controller('budget')
export class BudgetController {
  constructor(private readonly budgetRepository: AbstractBudgetRepository) { }

  @Post('create')
  async create(@Body() budget: BudgetDTO): Promise<Budget> {
    const created = await this.budgetRepository.createBudget(budget);
    return created;
  }

  @Get('all')
  async getAll(): Promise<Budget[]> {
    const budgets = await this.budgetRepository.getAllBudgets();
    return budgets;
  }

  @Put('upgrade/:id')
  async upgradeBudget(@Param('id') id: number, @Body() budget: UpdateBudgetDto): Promise<Budget> {
    const updated = await this.budgetRepository.updateBudget(id, budget);
    return updated;
  }

  @Delete('delete/:id')
  async deleteBudget(@Param('id') id: number): Promise<void> {
    await this.budgetRepository.deleteBudget(id);
  }

  @Get(':id')
  async getBudget(@Param('id') id: number): Promise<Budget> {
    const budget = await this.budgetRepository.findBudgetByid(id);
    return budget;
  }
}
