CREATE TABLE "public"."water_logs" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now(),
  "profile" text NOT NULL,
  "amount" numeric NOT NULL,
  "unit" text NOT NULL DEFAULT 'mL',
  "type" text NOT NULL DEFAULT 'water-log',
  PRIMARY KEY ("id"),
  FOREIGN KEY ("profile") REFERENCES "public"."profiles"("authId")
    ON UPDATE cascade ON DELETE cascade,
  CONSTRAINT "valid_unit" CHECK (unit = ANY (ARRAY['mL'::text, 'oz'::text]))
);
CREATE TRIGGER "set_public_water_logs_updatedAt"
BEFORE UPDATE ON "public"."water_logs"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updatedAt"();
