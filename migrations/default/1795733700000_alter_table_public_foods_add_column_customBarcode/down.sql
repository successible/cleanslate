ALTER TABLE "public"."foods" DROP COLUMN "customBarcode";
DROP TRIGGER "set_public_foods_customBarcode" ON "public"."foods";
DROP FUNCTION "public"."set_food_custom_barcode"();
DROP FUNCTION "public"."next_custom_barcode"();
DROP SEQUENCE "public"."foods_customBarcode_seq";
