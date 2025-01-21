/*
  Warnings:

  - The `createdAt` column on the `Budget` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `createdAt` column on the `Investment` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `InvestmentCategory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `type` to the `Budget` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Budget` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `updatedAt` on the `Budget` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `amount` to the `Investment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Investment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Investment` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `updatedAt` on the `Investment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "CategoryType" AS ENUM ('EXPENSE', 'INVESTMENT');

-- CreateEnum
CREATE TYPE "ExpenseType" AS ENUM ('SIGNATURES', 'UTILITIES', 'TRANSPORTATION', 'ENTERTAINMENT', 'FOOD', 'HEALTH', 'EDUCATION', 'MISCELLANEOUS');

-- CreateEnum
CREATE TYPE "BudgetType" AS ENUM ('SPORTS', 'UTILITIES', 'GAMES', 'CLOTHING', 'ENTERTAINMENT', 'FOOD', 'OTHER');

-- AlterEnum
ALTER TYPE "InvestmentType" ADD VALUE 'REAL_ESTATE';

-- DropForeignKey
ALTER TABLE "Investment" DROP CONSTRAINT "Investment_categoryId_fkey";

-- DropIndex
DROP INDEX "Budget_id_key";

-- AlterTable
ALTER TABLE "Budget" ADD COLUMN     "type" "BudgetType" NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
DROP COLUMN "createdAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "updatedAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Investment" ADD COLUMN     "amount" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
DROP COLUMN "createdAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "updatedAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "InvestmentCategory";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expense" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "type" "ExpenseType" NOT NULL,
    "description" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "CategoryType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Budget" ADD CONSTRAINT "Budget_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Investment" ADD CONSTRAINT "Investment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Investment" ADD CONSTRAINT "Investment_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
