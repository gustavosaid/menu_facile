/*
  Warnings:

  - You are about to drop the column `location` on the `produtos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."pedidos" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "public"."produtos" DROP COLUMN "location";
