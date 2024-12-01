import { Decimal } from "@prisma/client/runtime/library";
import { IsDecimal, IsNotEmpty, IsString } from "class-validator";

export class CreateBudgetDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsDecimal()
    value: Decimal;

    @IsNotEmpty()
    @IsString()
    createdAt: string;

    @IsNotEmpty()
    @IsString()
    updateAt: string;
}
