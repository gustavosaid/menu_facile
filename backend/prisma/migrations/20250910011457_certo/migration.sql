/*
  Warnings:

  - Made the column `foto` on table `produtos` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."produtos" ALTER COLUMN "foto" SET NOT NULL;
