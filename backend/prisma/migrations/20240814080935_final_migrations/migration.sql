/*
  Warnings:

  - You are about to drop the column `Answer` on the `PublicFlashCard` table. All the data in the column will be lost.
  - You are about to drop the column `Title` on the `PublicFlashCard` table. All the data in the column will be lost.
  - You are about to drop the column `FirstName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `LastName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Answer` on the `UserFlashCard` table. All the data in the column will be lost.
  - You are about to drop the column `Title` on the `UserFlashCard` table. All the data in the column will be lost.
  - Added the required column `answer` to the `PublicFlashCard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `PublicFlashCard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `answer` to the `UserFlashCard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `UserFlashCard` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `UserFlashCard` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "UserFlashCard" DROP CONSTRAINT "UserFlashCard_userId_fkey";

-- AlterTable
ALTER TABLE "PublicFlashCard" DROP COLUMN "Answer",
DROP COLUMN "Title",
ADD COLUMN     "answer" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "FirstName",
DROP COLUMN "LastName",
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UserFlashCard" DROP COLUMN "Answer",
DROP COLUMN "Title",
ADD COLUMN     "answer" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "UserFlashCard" ADD CONSTRAINT "UserFlashCard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
