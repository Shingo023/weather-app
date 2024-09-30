/*
  Warnings:

  - Added the required column `placeId` to the `UserFavoriteCity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserFavoriteCity" ADD COLUMN     "placeId" TEXT NOT NULL;
