ALTER TABLE "public"."foods"
  ADD COLUMN "customBarcode" text NULL,
  ADD CONSTRAINT "foods_customBarcode_key" UNIQUE ("customBarcode"),
  ADD CONSTRAINT "foods_customBarcode_format"
    CHECK ("customBarcode" ~ '^CS[0-9]{8}$');
