/*
  Warnings:

  - You are about to drop the `FavoriteCity` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FavoriteCity" DROP CONSTRAINT "FavoriteCity_userId_fkey";

-- DropTable
DROP TABLE "FavoriteCity";

-- CreateTable
CREATE TABLE "City" (
    "id" SERIAL NOT NULL,
    "cityName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "timeZone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCity" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "cityId" INTEGER NOT NULL,

    CONSTRAINT "UserCity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserCity_userId_idx" ON "UserCity"("userId");

-- CreateIndex
CREATE INDEX "UserCity_cityId_idx" ON "UserCity"("cityId");

-- CreateIndex
CREATE UNIQUE INDEX "UserCity_userId_cityId_key" ON "UserCity"("userId", "cityId");

-- AddForeignKey
ALTER TABLE "UserCity" ADD CONSTRAINT "UserCity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCity" ADD CONSTRAINT "UserCity_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
