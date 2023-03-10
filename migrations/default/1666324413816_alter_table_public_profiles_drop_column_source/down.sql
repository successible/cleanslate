alter table "public"."profiles" alter column "source" drop not null;
alter table "public"."profiles" add column "source" text;
