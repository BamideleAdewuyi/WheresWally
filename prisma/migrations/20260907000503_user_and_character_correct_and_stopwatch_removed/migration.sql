/*
  Warnings:

  - You are about to drop the column `found` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `isFinished` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Stopwatch` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `maxX` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxY` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minX` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minY` to the `Character` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_userId_fkey";

-- DropForeignKey
ALTER TABLE "Stopwatch" DROP CONSTRAINT "Stopwatch_userId_fkey";

-- AlterTable
ALTER TABLE "Character" DROP COLUMN "found",
DROP COLUMN "userId",
ADD COLUMN     "maxX" INTEGER NOT NULL,
ADD COLUMN     "maxY" INTEGER NOT NULL,
ADD COLUMN     "minX" INTEGER NOT NULL,
ADD COLUMN     "minY" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isFinished";

-- DropTable
DROP TABLE "Stopwatch";
