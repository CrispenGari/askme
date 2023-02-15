-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "liked" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Settings" ALTER COLUMN "maxSpaceDistance" SET DEFAULT 3;
