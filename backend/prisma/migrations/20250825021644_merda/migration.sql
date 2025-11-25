/*
  Warnings:

  - Made the column `id_categoria` on table `produtos` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."produtos" ALTER COLUMN "id_categoria" SET NOT NULL;
