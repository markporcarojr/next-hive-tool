/*
  Warnings:

  - The `queen` column on the `Inspection` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `queenCell` column on the `Inspection` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `brood` column on the `Inspection` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `disease` column on the `Inspection` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `eggs` column on the `Inspection` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Inspection" DROP COLUMN "queen",
ADD COLUMN     "queen" BOOLEAN,
DROP COLUMN "queenCell",
ADD COLUMN     "queenCell" BOOLEAN,
DROP COLUMN "brood",
ADD COLUMN     "brood" BOOLEAN,
DROP COLUMN "disease",
ADD COLUMN     "disease" BOOLEAN,
DROP COLUMN "eggs",
ADD COLUMN     "eggs" BOOLEAN;
