-- CreateTable
CREATE TABLE "product_table" (
    "product_id" SERIAL NOT NULL,
    "product_ref" TEXT NOT NULL,
    "product_name" TEXT NOT NULL,
    "product_brand_id" INTEGER NOT NULL,
    "product_category" TEXT,
    "product_price" INTEGER DEFAULT 1,
    "product_gen_description" TEXT,
    "product_gen_characteristic" TEXT,
    "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "product_factory_price" INTEGER DEFAULT 1,
    "currency" TEXT DEFAULT E'EUR',
    "product_weight" INTEGER DEFAULT 1,
    "product_coutry_of_origin" TEXT,
    "product_sell_unit" TEXT DEFAULT E'Pieces',
    "product_box_weight" INTEGER DEFAULT 1,
    "product_sku" TEXT,
    "product_min_quanity" INTEGER DEFAULT 1,
    "product_volume" INTEGER DEFAULT 1,
    "product_custom_border_id" TEXT,
    "product_box_quantity" INTEGER DEFAULT 1,
    "product_box_volume" INTEGER DEFAULT 1,
    "product_img" TEXT,

    CONSTRAINT "product_table_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "brand_table" (
    "brand_id" SERIAL NOT NULL,
    "brand_name" TEXT NOT NULL,
    "brand_country_of_origin" TEXT,
    "industry" TEXT,
    "brand_img" TEXT,
    "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "brand_table_pkey" PRIMARY KEY ("brand_id")
);

-- CreateTable
CREATE TABLE "order_table" (
    "order_id" SERIAL NOT NULL,
    "order_product_list" JSONB NOT NULL,
    "order_import_cost" INTEGER DEFAULT 0,
    "order_tax_cost" INTEGER DEFAULT 0,
    "order_total_cost" INTEGER DEFAULT 0,
    "currency" TEXT DEFAULT E'EUR',
    "order_is_incomming" BOOLEAN DEFAULT true,
    "order_emmitted_date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "order_delivery_date" TIMESTAMP(3),
    "order_is_delivered" BOOLEAN DEFAULT false,

    CONSTRAINT "order_table_pkey" PRIMARY KEY ("order_id")
);

-- CreateTable
CREATE TABLE "inventory_table" (
    "inventory_id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "product_name" TEXT NOT NULL,
    "product_reference" TEXT NOT NULL,
    "order_id" INTEGER,
    "inventory_price" INTEGER NOT NULL,
    "currency" TEXT DEFAULT E'EUR',
    "product_brand_id" INTEGER NOT NULL,
    "product_brand_name" TEXT NOT NULL,
    "date_created" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "inventory_quantity" INTEGER NOT NULL DEFAULT 1,
    "last_updated" TIMESTAMP(3) NOT NULL,
    "agent_id" INTEGER,
    "product_mouvement" JSONB,

    CONSTRAINT "inventory_table_pkey" PRIMARY KEY ("inventory_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "product_table_product_ref_key" ON "product_table"("product_ref");

-- CreateIndex
CREATE UNIQUE INDEX "product_table_product_sku_key" ON "product_table"("product_sku");

-- CreateIndex
CREATE UNIQUE INDEX "product_table_product_custom_border_id_key" ON "product_table"("product_custom_border_id");

-- CreateIndex
CREATE UNIQUE INDEX "brand_table_brand_name_key" ON "brand_table"("brand_name");

-- CreateIndex
CREATE UNIQUE INDEX "inventory_table_product_id_key" ON "inventory_table"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "inventory_table_product_reference_key" ON "inventory_table"("product_reference");

-- AddForeignKey
ALTER TABLE "product_table" ADD CONSTRAINT "product_table_product_brand_id_fkey" FOREIGN KEY ("product_brand_id") REFERENCES "brand_table"("brand_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory_table" ADD CONSTRAINT "inventory_table_product_brand_id_fkey" FOREIGN KEY ("product_brand_id") REFERENCES "brand_table"("brand_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory_table" ADD CONSTRAINT "inventory_table_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product_table"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory_table" ADD CONSTRAINT "inventory_table_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order_table"("order_id") ON DELETE SET NULL ON UPDATE CASCADE;
