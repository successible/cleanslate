
alter table "public"."logs" alter column "recipe" set not null;

alter table "public"."logs" alter column "food" set not null;

ALTER TABLE "public"."profiles" ALTER COLUMN "subscribed" drop default;

alter table "public"."foods" drop constraint "valid_category";

alter table "public"."foods" drop constraint "valid_group";

alter table "public"."foods" rename column "groupName" to "group_name";

alter table "public"."profiles" drop column "apiToken" cascade
alter table "public"."profiles" drop column "apiToken";
-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- CREATE EXTENSION IF NOT EXISTS pgcrypto;

DROP TABLE "public"."feedback";

DROP TABLE "public"."logs";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."recipes" add column "type" text
--  not null default 'recipe';

alter table "public"."foods" drop constraint "foods_profile_name_key";
alter table "public"."foods" add constraint "foods_profile_key" unique ("profile");

alter table "public"."recipes" drop constraint "recipes_profile_name_key";
alter table "public"."recipes" add constraint "recipes_profile_key" unique ("profile");

alter table "public"."ingredients" drop constraint "ingredients_profile_fkey";

DROP TABLE "public"."ingredients";

DROP TABLE "public"."recipes";

alter table "public"."foods" drop constraint "foods_profile_fkey";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."foods" add column "profile" text
--  null unique;

DROP TABLE "public"."foods";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."profiles" add column "proteinTarget" numeric
--  not null default '150';

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."profiles" add column "calorieTarget" numeric
--  not null default '2000';

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."profiles" add column "type" text
--  not null default 'profile';

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."profiles" add column "source" text
--  null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."profiles" add column "timezone" text
--  null default 'America/Chicago';

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."profiles" add column "subscriptionId" text
--  null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."profiles" add column "subscribed" boolean
--  not null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."profiles" add column "customerId" text
--  null unique;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."profiles" add column "username" text
--  not null unique;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."profiles" add column "authId" text
--  not null unique;

DROP TABLE "public"."profiles";
