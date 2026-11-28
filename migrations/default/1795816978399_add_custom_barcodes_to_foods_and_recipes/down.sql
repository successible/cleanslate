DROP TRIGGER "set_public_foods_customBarcode" ON "public"."foods";
DROP TRIGGER "set_public_recipes_customBarcode" ON "public"."recipes";
DROP FUNCTION "public"."set_custom_barcode"();
DROP SEQUENCE "public"."custom_barcode_seq";
ALTER TABLE "public"."foods" DROP COLUMN "customBarcode";
ALTER TABLE "public"."recipes" DROP COLUMN "customBarcode";
