-- CreateTable
CREATE TABLE "Inspection" (
    "id" SERIAL NOT NULL,
    "hiveNumber" INTEGER NOT NULL,
    "temperament" TEXT NOT NULL,
    "hiveStrength" INTEGER NOT NULL,
    "inspectionDate" TIMESTAMP(3) NOT NULL,
    "inspectionImage" TEXT,
    "queen" TEXT,
    "queenCell" TEXT,
    "brood" TEXT,
    "disease" TEXT,
    "eggs" TEXT,
    "pests" TEXT,
    "feeding" TEXT,
    "treatments" TEXT,
    "inspectionNote" TEXT,
    "weatherCondition" TEXT,
    "weatherTemp" TEXT,
    "userId" INTEGER NOT NULL,
    "hiveId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inspection_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Inspection" ADD CONSTRAINT "Inspection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inspection" ADD CONSTRAINT "Inspection_hiveId_fkey" FOREIGN KEY ("hiveId") REFERENCES "Hive"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
