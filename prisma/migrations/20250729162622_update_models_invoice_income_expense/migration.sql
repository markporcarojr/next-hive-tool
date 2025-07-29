/*
  Warnings:

  - Added the required column `updatedAt` to the `Income` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerName` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Income" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "customerName" TEXT NOT NULL,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "phone" TEXT;
