/*
  Warnings:

  - A unique constraint covering the columns `[id,userId]` on the table `UserFlashCard` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserFlashCard_id_userId_key" ON "UserFlashCard"("id", "userId");
