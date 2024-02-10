CREATE TABLE "public"."quick_logs" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "createdAt" timestamptz NOT NULL DEFAULT now(), "updatedAt" timestamptz NOT NULL DEFAULT now(), "profile" text NOT NULL, "protein" numeric NOT NULL, "calories" numeric NOT NULL, "name" text, "consumed" boolean NOT NULL DEFAULT true, "meal" text NOT NULL DEFAULT 'Snack', "type" text NOT NULL DEFAULT 'quick-log', PRIMARY KEY ("id") , FOREIGN KEY ("profile") REFERENCES "public"."profiles"("authId") ON UPDATE cascade ON DELETE cascade, CONSTRAINT "valid_meal" CHECK (meal = ANY (ARRAY['Breakfast'::text, 'Lunch'::text, 'Dinner'::text, 'Snack'::text])));
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updatedAt"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updatedAt" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_quick_logs_updatedAt"
BEFORE UPDATE ON "public"."quick_logs"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updatedAt"();
COMMENT ON TRIGGER "set_public_quick_logs_updatedAt" ON "public"."quick_logs"
IS 'trigger to set value of column "updatedAt" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;