/*
  Warnings:

  - Added the required column `ingredientes` to the `produtos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."produtos" ADD COLUMN     "ingredientes" VARCHAR(1000) NOT NULL;
