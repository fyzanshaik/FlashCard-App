/*
  Warnings:

  - You are about to drop the `FlashCard` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "FlashCard";

-- CreateTable
CREATE TABLE "UserFlashCard" (
    "id" SERIAL NOT NULL,
    "Title" TEXT NOT NULL,
    "Answer" TEXT NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "UserFlashCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PublicFlashCard" (
    "id" SERIAL NOT NULL,
    "Title" TEXT NOT NULL,
    "Answer" TEXT NOT NULL,

    CONSTRAINT "PublicFlashCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "FirstName" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "UserFlashCard" ADD CONSTRAINT "UserFlashCard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
