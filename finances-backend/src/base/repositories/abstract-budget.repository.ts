import { CreateBudgetDto } from "@dtos/create-budget.dto";
import { UpdateBudgetDto } from "@dtos/update-budget.dto";
import { Budget } from "@prisma/client";

export abstract class AbstractBudgetRepository {
    abstract createBudget(createBudgetDto: CreateBudgetDto): Promise<Budget>;
    abstract updateBudget(id: number, budget: UpdateBudgetDto): Promise<Budget>
    abstract deleteBudget(id: number): Promise<Budget>;
    abstract getAllBudgets(): Promise<Budget[]>;
    abstract findBudgetByid(id: number): Promise<Budget>;
}