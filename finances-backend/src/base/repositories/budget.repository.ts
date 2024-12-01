import { PrismaService } from '@database/prisma.service';
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { AbstractBudgetRepository } from './abstract-budget.repository';
import { CreateBudgetDto } from '@dtos/create-budget.dto';
import { Budget } from '@prisma/client';
import { UpdateBudgetDto } from '@dtos/update-budget.dto';

@Injectable()
export class BudgetRepository implements AbstractBudgetRepository {
  constructor(private readonly prismaService: PrismaService) { }
  createBudget(budget: CreateBudgetDto): Promise<Budget> {
    try {
      const newBudget = this.prismaService.budget.create({
        data: budget
      })
      return newBudget;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
  updateBudget(id: number, budget: UpdateBudgetDto): Promise<Budget> {
    try {
      const updatedBudget = this.prismaService.budget.update({
        where: { id: id },
        data: budget
      })
      return updatedBudget;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
  deleteBudget(id: number): Promise<Budget> {
    try {
      const deletedBudget = this.prismaService.budget.delete({
        where: { id: id }
      })
      return deletedBudget;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
  getAllBudgets(): Promise<Budget[]> {
    try {
      const allBudgets = this.prismaService.budget.findMany()
      return allBudgets;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
  findBudgetByid(id: number): Promise<Budget> {
    try {
      const foundBudget = this.prismaService.budget.findFirst({
        where: { id: id }
      })
      return foundBudget;
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }
}
