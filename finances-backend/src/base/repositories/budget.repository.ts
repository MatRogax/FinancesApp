import { PrismaService } from '@database/prisma.service';
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { AbstractBudgetRepository } from './abstract-budget.repository';
import { CreateBudgetDto } from '@dtos/create-budget.dto';
import { Budget } from '@prisma/client';
import { UpdateBudgetDto } from '@dtos/update-budget.dto';
import { Utils } from '@utils/utils';

@Injectable()
export class BudgetRepository implements AbstractBudgetRepository {
  constructor(private readonly prismaService: PrismaService) { }

  async createBudget(budget: CreateBudgetDto): Promise<Budget> {
    const currentDate = new Date();
    const formattedDate = Utils.formatDatetime(currentDate);
    try {
      const newBudget = await this.prismaService.budget.create({
        data: {
          ...budget,
          createdAt: formattedDate,
          updatedAt: formattedDate,
        }
      });
      return newBudget;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
  async updateBudget(id: number, budget: UpdateBudgetDto): Promise<Budget> {
    const currentDate = new Date();
    const formattedDate = Utils.formatDatetime(currentDate);
    try {
      const updatedBudget = this.prismaService.budget.update({
        where: { id: id },
        data: {
          ...budget,
          updatedAt: formattedDate,
        }
      })
      return updatedBudget;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
  async deleteBudget(id: number): Promise<Budget> {
    try {
      const deletedBudget = this.prismaService.budget.delete({
        where: { id: id }
      })
      return deletedBudget;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
  async getAllBudgets(): Promise<Budget[]> {
    try {
      const allBudgets = this.prismaService.budget.findMany()
      return allBudgets;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
  async findBudgetByid(id: number): Promise<Budget> {
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
