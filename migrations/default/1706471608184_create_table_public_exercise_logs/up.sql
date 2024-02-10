CREATE TABLE "public"."exercise_logs" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "createdAt" timestamptz NOT NULL DEFAULT now(), "updatedAt" timestamptz NOT NULL DEFAULT now(), "type" text NOT NULL DEFAULT 'exercise-log', "profile" text NOT NULL, "amount" numeric NOT NULL, "name" text NOT NULL, "weight" numeric NOT NULL, "duration" numeric, "pace" numeric, "incline" numeric, "power" numeric, "groupName" text NOT NULL, "category" text NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("profile") REFERENCES "public"."profiles"("authId") ON UPDATE cascade ON DELETE cascade, CONSTRAINT "valid_category" CHECK (category = ANY (ARRAY['Baseball'::text, 'Basketball'::text, 'Boxing'::text, 'Cricket'::text, 'Dance'::text, 'Field hockey'::text, 'Football'::text, 'Golf'::text, 'Hiking'::text, 'Horseback riding'::text, 'Ice hockey'::text, 'Ice skating'::text, 'Jumping rope'::text, 'Lacrosse'::text, 'Martial arts'::text, 'Racquetball'::text, 'Roller skating'::text, 'Rugby'::text, 'Skateboarding'::text, 'Skiing'::text, 'Soccer'::text, 'Softball'::text, 'Squash'::text, 'Tennis (doubles)'::text, 'Tennis (singles)'::text, 'Volleyball'::text, 'Water polo'::text, 'Wrestling'::text, 'Backstroke'::text, 'Breaststroke'::text, 'Butterfly'::text, 'Freestyle'::text])), CONSTRAINT "valid_group" CHECK ("groupName" = ANY (ARRAY['Cycling'::text, 'Lifting'::text, 'Rowing'::text, 'Running'::text, 'Swimming'::text, 'Walking'::text, 'Other'::text, 'Custom'::text])));
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
CREATE TRIGGER "set_public_exercise_logs_updatedAt"
BEFORE UPDATE ON "public"."exercise_logs"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updatedAt"();
COMMENT ON TRIGGER "set_public_exercise_logs_updatedAt" ON "public"."exercise_logs"
IS 'trigger to set value of column "updatedAt" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;