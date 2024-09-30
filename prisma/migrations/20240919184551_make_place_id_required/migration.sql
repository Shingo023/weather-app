/*
  Warnings:

  - A unique constraint covering the columns `[placeId]` on the table `FavoriteCity` will be added. If there are existing duplicate values, this will fail.
  - Made the column `placeId` on table `FavoriteCity` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "FavoriteCity" ALTER COLUMN "placeId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteCity_placeId_key" ON "FavoriteCity"("placeId");
