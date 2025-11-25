-- CreateTable
CREATE TABLE "public"."produtos" (
    "id_Produto" SERIAL NOT NULL,
    "descricao" VARCHAR(255) NOT NULL,
    "location" TEXT NOT NULL,
    "preco" INTEGER NOT NULL,
    "id_Categoria" INTEGER NOT NULL,

    CONSTRAINT "produtos_pkey" PRIMARY KEY ("id_Produto")
);

-- CreateTable
CREATE TABLE "public"."categoria" (
    "id_Categoria" SERIAL NOT NULL,
    "descricao" VARCHAR(255) NOT NULL,

    CONSTRAINT "categoria_pkey" PRIMARY KEY ("id_Categoria")
);

-- CreateTable
CREATE TABLE "public"."status" (
    "id_Status" SERIAL NOT NULL,
    "descricao" VARCHAR(255) NOT NULL,

    CONSTRAINT "status_pkey" PRIMARY KEY ("id_Status")
);

-- CreateTable
CREATE TABLE "public"."pedidos" (
    "id" SERIAL NOT NULL,
    "mesa" INTEGER NOT NULL,
    "pedido" TEXT NOT NULL,
    "fechado" BOOLEAN NOT NULL,
    "status" INTEGER NOT NULL,

    CONSTRAINT "pedidos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."itens_Pedidos" (
    "id_item" SERIAL NOT NULL,
    "seq" VARCHAR(8) NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "observacao" VARCHAR(255) NOT NULL,
    "precoUnit" INTEGER NOT NULL,
    "produto" INTEGER NOT NULL,
    "id_Pedido" INTEGER NOT NULL,

    CONSTRAINT "itens_Pedidos_pkey" PRIMARY KEY ("id_item")
);

-- CreateIndex
CREATE UNIQUE INDEX "produtos_id_Produto_key" ON "public"."produtos"("id_Produto");

-- CreateIndex
CREATE UNIQUE INDEX "categoria_id_Categoria_key" ON "public"."categoria"("id_Categoria");

-- CreateIndex
CREATE UNIQUE INDEX "pedidos_id_key" ON "public"."pedidos"("id");

-- CreateIndex
CREATE UNIQUE INDEX "itens_Pedidos_id_item_key" ON "public"."itens_Pedidos"("id_item");

-- AddForeignKey
ALTER TABLE "public"."produtos" ADD CONSTRAINT "produtos_id_Categoria_fkey" FOREIGN KEY ("id_Categoria") REFERENCES "public"."categoria"("id_Categoria") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."pedidos" ADD CONSTRAINT "pedidos_status_fkey" FOREIGN KEY ("status") REFERENCES "public"."status"("id_Status") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."itens_Pedidos" ADD CONSTRAINT "itens_Pedidos_id_Pedido_fkey" FOREIGN KEY ("id_Pedido") REFERENCES "public"."pedidos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."itens_Pedidos" ADD CONSTRAINT "itens_Pedidos_produto_fkey" FOREIGN KEY ("produto") REFERENCES "public"."produtos"("id_Produto") ON DELETE RESTRICT ON UPDATE CASCADE;
