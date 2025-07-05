-- AlterTable
ALTER TABLE "Hive" ADD COLUMN     "isFromSwarmTrap" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "swarmCaptureDate" TIMESTAMP(3),
ADD COLUMN     "swarmTrapId" INTEGER;

-- CreateTable
CREATE TABLE "SwarmTrap" (
    "id" SERIAL NOT NULL,
    "location" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "notes" TEXT,
    "installedAt" TIMESTAMP(3) NOT NULL,
    "removedAt" TIMESTAMP(3),
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SwarmTrap_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Hive" ADD CONSTRAINT "Hive_swarmTrapId_fkey" FOREIGN KEY ("swarmTrapId") REFERENCES "SwarmTrap"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SwarmTrap" ADD CONSTRAINT "SwarmTrap_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
