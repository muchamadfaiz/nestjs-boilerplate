-- CreateEnum
CREATE TYPE "Status" AS ENUM ('pending', 'progress', 'done');

-- AlterTable
ALTER TABLE "tasks" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'pending';
