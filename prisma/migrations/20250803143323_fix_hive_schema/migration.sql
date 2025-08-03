/*
  Warnings:

  - Made the column `hiveNumber` on table `Hive` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Hive" ALTER COLUMN "hiveNumber" SET NOT NULL;
