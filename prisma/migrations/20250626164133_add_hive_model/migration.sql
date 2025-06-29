-- CreateTable
CREATE TABLE "Hive" (
    "id" SERIAL NOT NULL,
    "hiveDate" TIMESTAMP(3) NOT NULL,
    "hiveNumber" INTEGER NOT NULL,
    "hiveSource" TEXT NOT NULL,
    "hiveImage" TEXT,
    "broodBoxes" INTEGER,
    "superBoxes" INTEGER,
    "hiveStrength" INTEGER,
    "queenColor" TEXT,
    "queenAge" TEXT,
    "queenExcluder" TEXT,
    "breed" TEXT,
    "frames" INTEGER,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Hive_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Hive" ADD CONSTRAINT "Hive_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
