/*
  Warnings:

  - You are about to drop the column `dueDate` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Invoice` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "dueDate",
DROP COLUMN "title";
