-- AlterTable
ALTER TABLE "FavoriteCity" ADD COLUMN     "placeId" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "defaultCityId" INTEGER;

-- AlterTable
ALTER TABLE "UserFavoriteCity" ADD COLUMN     "customName" TEXT;

-- CreateIndex
CREATE INDEX "FavoriteCity_placeId_idx" ON "FavoriteCity"("placeId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_defaultCityId_fkey" FOREIGN KEY ("defaultCityId") REFERENCES "FavoriteCity"("id") ON DELETE SET NULL ON UPDATE CASCADE;
