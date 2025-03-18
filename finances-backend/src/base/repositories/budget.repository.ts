import { PrismaService } from '@database/prisma.service';
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { AbstractBudgetRepository } from './abstract-budget.repository';
import { Budget } from '@prisma/client';
import { UpdateBudgetDto } from '@dtos/update-budget.dto';
import { BudgetDTO } from '@dtos/create-budget.dto';

@Injectable()
export class BudgetRepository implements AbstractBudgetRepository {
    constructor(private readonly prismaService: PrismaService) { }

    async createBudget(budget: BudgetDTO): Promise<Budget> {
        try {
            const newBudget = this.prismaService.budget.create({ data: budget })
            return newBudget;
        } catch (err) {
            throw new BadRequestException(err);
        }
    }
    async updateBudget(id: number, budget: UpdateBudgetDto): Promise<Budget> {
        try {
            const updatedBudget = this.prismaService.budget.update({
                where: { id: id },
                data: budget,
            })
            return updatedBudget;
        } catch (err: unknown) {
            throw new BadRequestException(err);
        }
    }
    async deleteBudget(id: number): Promise<Budget> {
        try {
            const deletedBudget = this.prismaService.budget.delete({
                where: { id: id }
            })
            return deletedBudget;
        } catch (err: unknown) {
            throw new BadRequestException(err);
        }
    }
    async getAllBudgets(): Promise<Budget[]> {
        try {
            const allBudgets = this.prismaService.budget.findMany()
            return allBudgets;
        } catch (err: unknown) {
            throw new InternalServerErrorException(err);
        }
    }
    async findBudgetByid(id: number): Promise<Budget> {
        try {
            const foundBudget = await this.prismaService.budget.findFirst({
                where: { id: id }
            })
            return foundBudget!;
        } catch (err: unknown) {
            throw new NotFoundException(err);
        }
    }
}
