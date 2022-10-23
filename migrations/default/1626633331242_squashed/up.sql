
CREATE TABLE "public"."profiles" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "createdAt" timestamptz NOT NULL DEFAULT now(), "updatedAt" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") );
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
CREATE TRIGGER "set_public_profiles_updatedAt"
BEFORE UPDATE ON "public"."profiles"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updatedAt"();
COMMENT ON TRIGGER "set_public_profiles_updatedAt" ON "public"."profiles" 
IS 'trigger to set value of column "updatedAt" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

alter table "public"."profiles" add column "authId" text
 not null unique;

alter table "public"."profiles" add column "username" text
 not null unique;

alter table "public"."profiles" add column "customerId" text
 null unique;

alter table "public"."profiles" add column "subscribed" boolean
 not null;

alter table "public"."profiles" add column "subscriptionId" text
 null;

alter table "public"."profiles" add column "timezone" text
 null default 'America/Chicago';

alter table "public"."profiles" add column "source" text
 null;

alter table "public"."profiles" add column "type" text
 not null default 'profile';

alter table "public"."profiles" add column "calorieTarget" numeric
 not null default '2000';

alter table "public"."profiles" add column "proteinTarget" numeric
 not null default '150';

CREATE TABLE "public"."foods" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "createdAt" timestamptz NOT NULL DEFAULT now(), "updatedAt" timestamptz NOT NULL DEFAULT now(), "type" text NOT NULL DEFAULT 'food', "basicFoodId" text, "name" text NOT NULL, "group_name" text NOT NULL, "category" text NOT NULL, "countName" text, "containerName" text, "caloriesPerGram" numeric, "proteinPerGram" numeric, "caloriesPerCount" numeric, "proteinPerCount" numeric, "countToGram" numeric, "countToTbsp" numeric, "tbspToGram" numeric, "servingPerContainer" numeric, "preferredVolumeUnit" text, "preferredWeightUnit" text, PRIMARY KEY ("id") );
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
CREATE TRIGGER "set_public_foods_updatedAt"
BEFORE UPDATE ON "public"."foods"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updatedAt"();
COMMENT ON TRIGGER "set_public_foods_updatedAt" ON "public"."foods" 
IS 'trigger to set value of column "updatedAt" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

alter table "public"."foods" add column "profile" text
 null unique;

alter table "public"."foods"
  add constraint "foods_profile_fkey"
  foreign key ("profile")
  references "public"."profiles"
  ("authId") on update cascade on delete cascade;

CREATE TABLE "public"."recipes" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "createdAt" timestamptz NOT NULL DEFAULT now(), "updatedAt" timestamptz NOT NULL DEFAULT now(), "profile" text NOT NULL, "name" text NOT NULL, "countName" text, "containerName" text, "servingPerContainer" numeric, PRIMARY KEY ("id") , FOREIGN KEY ("profile") REFERENCES "public"."profiles"("authId") ON UPDATE cascade ON DELETE cascade, UNIQUE ("profile"));
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
CREATE TRIGGER "set_public_recipes_updatedAt"
BEFORE UPDATE ON "public"."recipes"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updatedAt"();
COMMENT ON TRIGGER "set_public_recipes_updatedAt" ON "public"."recipes" 
IS 'trigger to set value of column "updatedAt" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE "public"."ingredients" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "createdAt" timestamptz NOT NULL DEFAULT now(), "updatedAt" timestamptz NOT NULL DEFAULT now(), "profile" text NOT NULL, "food" uuid, "childRecipe" uuid, "recipe" uuid NOT NULL, "amount" numeric NOT NULL, "unit" text NOT NULL, "type" text NOT NULL DEFAULT 'ingredient', PRIMARY KEY ("id") , FOREIGN KEY ("food") REFERENCES "public"."foods"("id") ON UPDATE cascade ON DELETE cascade, FOREIGN KEY ("childRecipe") REFERENCES "public"."recipes"("id") ON UPDATE cascade ON DELETE cascade, FOREIGN KEY ("recipe") REFERENCES "public"."recipes"("id") ON UPDATE cascade ON DELETE cascade);
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
CREATE TRIGGER "set_public_ingredients_updatedAt"
BEFORE UPDATE ON "public"."ingredients"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updatedAt"();
COMMENT ON TRIGGER "set_public_ingredients_updatedAt" ON "public"."ingredients" 
IS 'trigger to set value of column "updatedAt" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

alter table "public"."ingredients"
  add constraint "ingredients_profile_fkey"
  foreign key ("profile")
  references "public"."profiles"
  ("authId") on update cascade on delete cascade;

alter table "public"."recipes" drop constraint "recipes_profile_key";
alter table "public"."recipes" add constraint "recipes_profile_name_key" unique ("profile", "name");

alter table "public"."foods" drop constraint "foods_profile_key";
alter table "public"."foods" add constraint "foods_profile_name_key" unique ("profile", "name");

alter table "public"."recipes" add column "type" text
 not null default 'recipe';

CREATE TABLE "public"."logs" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "createdAt" timestamptz NOT NULL DEFAULT now(), "updatedAt" timestamptz NOT NULL DEFAULT now(), "type" text NOT NULL DEFAULT 'log', "amount" numeric NOT NULL, "unit" text NOT NULL, "profile" text NOT NULL, "food" uuid NOT NULL, "recipe" uuid NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("profile") REFERENCES "public"."profiles"("authId") ON UPDATE cascade ON DELETE cascade, FOREIGN KEY ("recipe") REFERENCES "public"."recipes"("id") ON UPDATE cascade ON DELETE cascade, FOREIGN KEY ("food") REFERENCES "public"."foods"("id") ON UPDATE cascade ON DELETE cascade);
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
CREATE TRIGGER "set_public_logs_updatedAt"
BEFORE UPDATE ON "public"."logs"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updatedAt"();
COMMENT ON TRIGGER "set_public_logs_updatedAt" ON "public"."logs" 
IS 'trigger to set value of column "updatedAt" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE "public"."feedback" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "createdAt" timestamptz NOT NULL DEFAULT now(), "updatedAt" timestamptz NOT NULL DEFAULT now(), "type" text NOT NULL DEFAULT 'feedback', "text" text NOT NULL, "profile" text NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("profile") REFERENCES "public"."profiles"("authId") ON UPDATE cascade ON DELETE cascade);
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
CREATE TRIGGER "set_public_feedback_updatedAt"
BEFORE UPDATE ON "public"."feedback"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updatedAt"();
COMMENT ON TRIGGER "set_public_feedback_updatedAt" ON "public"."feedback" 
IS 'trigger to set value of column "updatedAt" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE EXTENSION IF NOT EXISTS pgcrypto;
alter table "public"."profiles" add column "apiToken" uuid
 not null default gen_random_uuid();

alter table "public"."foods" rename column "group_name" to "groupName";

alter table "public"."foods" add constraint "valid_group" check ("groupName" = ANY (ARRAY['Custom'::text, 'Dairy'::text, 'Fat or sugar'::text, 'Fruit'::text, 'Grain'::text, 'Other'::text, 'Protein'::text, 'Vegetable'::text]));

alter table "public"."foods" add constraint "valid_category" check (category = ANY (ARRAY['Alcohol'::text, 'Bagel'::text, 'Baked food'::text, 'Bean'::text, 'Beef'::text, 'Beverage'::text, 'Bread'::text, 'Butter'::text, 'Candy'::text, 'Cheese'::text, 'Chicken'::text, 'Chickpea'::text, 'Cold cut'::text, 'Cottage cheese'::text, 'Cream'::text, 'Dairy'::text, 'Dried fruit'::text, 'Edamame'::text, 'Eggs'::text, 'Fish'::text, 'Flour'::text, 'Food'::text, 'Fruit'::text, 'Gluten'::text, 'Goat'::text, 'Ground meat'::text, 'Herb'::text, 'Ice cream'::text, 'Jerky'::text, 'Lamb'::text, 'Leafy green'::text, 'Lentil'::text, 'Lettuce'::text, 'Mayonnaise'::text, 'Milk'::text, 'Muffin'::text, 'Noodles'::text, 'Nut'::text, 'Nut milk'::text, 'Oil'::text, 'Pasta'::text, 'Pea'::text, 'Pea'::text, 'Pepper'::text, 'Pork'::text, 'Prepared food'::text, 'Protein powder'::text, 'Quark'::text, 'Recipe'::text, 'Ribs'::text, 'Rice'::text, 'Sauce'::text, 'Seed'::text, 'Shellfish'::text, 'Snack'::text, 'Sour cream'::text, 'Soy'::text, 'Spice'::text, 'Stock'::text, 'Sweetener'::text, 'Tortilla'::text, 'Turkey'::text, 'Vegetable'::text, 'Vinegar'::text, 'Whole grain'::text, 'Yogurt'::text]));

alter table "public"."profiles" alter column "subscribed" set default 'False';

alter table "public"."logs" alter column "food" drop not null;

alter table "public"."logs" alter column "recipe" drop not null;
