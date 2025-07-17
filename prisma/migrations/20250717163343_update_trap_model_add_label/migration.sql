/*
  Warnings:

  - You are about to drop the column `location` on the `SwarmTrap` table. All the data in the column will be lost.
  - Added the required column `label` to the `SwarmTrap` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SwarmTrap" DROP COLUMN "location",
ADD COLUMN     "label" TEXT NOT NULL;
