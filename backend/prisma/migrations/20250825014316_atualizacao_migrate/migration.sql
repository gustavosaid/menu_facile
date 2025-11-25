/*
  Warnings:

  - You are about to drop the column `id_Categoria` on the `produtos` table. All the data in the column will be lost.
  - Added the required column `id_categoria` to the `produtos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."produtos" DROP CONSTRAINT "produtos_id_Categoria_fkey";

-- AlterTable
ALTER TABLE "public"."produtos" DROP COLUMN "id_Categoria",
ADD COLUMN     "id_categoria" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."produtos" ADD CONSTRAINT "produtos_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "public"."categoria"("id_Categoria") ON DELETE NO ACTION ON UPDATE NO ACTION;
