/*
  Warnings:

  - You are about to drop the `City` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserCity` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserCity" DROP CONSTRAINT "UserCity_cityId_fkey";

-- DropForeignKey
ALTER TABLE "UserCity" DROP CONSTRAINT "UserCity_userId_fkey";

-- DropTable
DROP TABLE "City";

-- DropTable
DROP TABLE "UserCity";

-- CreateTable
CREATE TABLE "FavoriteCity" (
    "id" SERIAL NOT NULL,
    "cityName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "timeZone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FavoriteCity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserFavoriteCity" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "favoriteCityId" INTEGER NOT NULL,

    CONSTRAINT "UserFavoriteCity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserFavoriteCity_userId_idx" ON "UserFavoriteCity"("userId");

-- CreateIndex
CREATE INDEX "UserFavoriteCity_favoriteCityId_idx" ON "UserFavoriteCity"("favoriteCityId");

-- CreateIndex
CREATE UNIQUE INDEX "UserFavoriteCity_userId_favoriteCityId_key" ON "UserFavoriteCity"("userId", "favoriteCityId");

-- AddForeignKey
ALTER TABLE "UserFavoriteCity" ADD CONSTRAINT "UserFavoriteCity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFavoriteCity" ADD CONSTRAINT "UserFavoriteCity_favoriteCityId_fkey" FOREIGN KEY ("favoriteCityId") REFERENCES "FavoriteCity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
