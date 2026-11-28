ALTER TABLE "public"."foods" ADD COLUMN "customBarcode" TEXT
 null;

ALTER TABLE "public"."foods" ADD CONSTRAINT "foods_customBarcode_key" UNIQUE ("customBarcode");

ALTER TABLE "public"."foods" ADD CONSTRAINT "valid_customBarcode" CHECK ("customBarcode" ~ '^CS[0-9A-F]{12}$');

ALTER TABLE "public"."recipes" ADD COLUMN "customBarcode" TEXT
 null;

ALTER TABLE "public"."recipes" ADD CONSTRAINT "recipes_customBarcode_key" UNIQUE ("customBarcode");

ALTER TABLE "public"."recipes" ADD CONSTRAINT "valid_customBarcode" CHECK ("customBarcode" ~ '^CS[0-9A-F]{12}$');

CREATE OR REPLACE FUNCTION "public"."set_custom_barcode"()
RETURNS TRIGGER AS $$
BEGIN
  NEW."customBarcode" := 'CS' || upper(substring(replace(gen_random_uuid()::text, '-', '') from 1 for 12));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Only custom foods that have no Open Food Facts code get a barcode.
CREATE TRIGGER "set_public_foods_customBarcode"
BEFORE INSERT ON "public"."foods"
FOR EACH ROW
WHEN (
  NEW."profile" IS NOT NULL
  AND COALESCE(NEW."openFoodFactsCode", '') = ''
  AND COALESCE(NEW."customBarcode", '') = ''
)
EXECUTE PROCEDURE "public"."set_custom_barcode"();

COMMENT ON TRIGGER "set_public_foods_customBarcode" ON "public"."foods"
IS 'trigger to set value of column "customBarcode" on row insert';

CREATE TRIGGER "set_public_recipes_customBarcode"
BEFORE INSERT ON "public"."recipes"
FOR EACH ROW
WHEN (COALESCE(NEW."customBarcode", '') = '')
EXECUTE PROCEDURE "public"."set_custom_barcode"();

COMMENT ON TRIGGER "set_public_recipes_customBarcode" ON "public"."recipes"
IS 'trigger to set value of column "customBarcode" on row insert';

-- Give a barcode to the applicable foods and recipes that exist now.
UPDATE "public"."foods"
SET "customBarcode" = 'CS' || upper(substring(replace(gen_random_uuid()::text, '-', '') from 1 for 12))
WHERE "profile" IS NOT NULL
  AND COALESCE("openFoodFactsCode", '') = '';

UPDATE "public"."recipes"
SET "customBarcode" = 'CS' || upper(substring(replace(gen_random_uuid()::text, '-', '') from 1 for 12));
