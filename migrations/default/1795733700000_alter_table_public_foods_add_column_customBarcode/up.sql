ALTER TABLE "public"."foods"
  ADD COLUMN "customBarcode" text NULL,
  ADD CONSTRAINT "foods_customBarcode_key" UNIQUE ("customBarcode"),
  ADD CONSTRAINT "foods_customBarcode_format"
    CHECK ("customBarcode" ~ '^CS[0-9]{8}$');

CREATE SEQUENCE "public"."foods_customBarcode_seq" MINVALUE 1 MAXVALUE 99999999;

CREATE FUNCTION "public"."next_custom_barcode"()
RETURNS text
LANGUAGE plpgsql
AS $$
DECLARE
  code text;
BEGIN
  LOOP
    code := 'CS' || lpad(nextval('public."foods_customBarcode_seq"')::text, 8, '0');
    -- Skip a code that an earlier, random method already used.
    EXIT WHEN NOT EXISTS (
      SELECT 1 FROM public.foods WHERE "customBarcode" = code
    );
  END LOOP;
  RETURN code;
END;
$$;

CREATE FUNCTION "public"."set_food_custom_barcode"()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW."customBarcode" := public.next_custom_barcode();
  RETURN NEW;
END;
$$;

-- Only custom foods that have no Open Food Facts code get a barcode.
CREATE TRIGGER "set_public_foods_customBarcode"
BEFORE INSERT ON "public"."foods"
FOR EACH ROW
WHEN (
  NEW."profile" IS NOT NULL
  AND COALESCE(NEW."openFoodFactsCode", '') = ''
  AND NEW."customBarcode" IS NULL
)
EXECUTE FUNCTION "public"."set_food_custom_barcode"();

-- Give a barcode to the applicable foods that exist now.
UPDATE "public"."foods"
SET "customBarcode" = public.next_custom_barcode()
WHERE "profile" IS NOT NULL
  AND COALESCE("openFoodFactsCode", '') = ''
  AND "customBarcode" IS NULL;
