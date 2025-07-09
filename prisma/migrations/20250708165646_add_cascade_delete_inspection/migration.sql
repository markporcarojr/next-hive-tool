-- DropForeignKey
ALTER TABLE "Inspection" DROP CONSTRAINT "Inspection_hiveId_fkey";

-- AddForeignKey
ALTER TABLE "Inspection" ADD CONSTRAINT "Inspection_hiveId_fkey" FOREIGN KEY ("hiveId") REFERENCES "Hive"("id") ON DELETE CASCADE ON UPDATE CASCADE;
