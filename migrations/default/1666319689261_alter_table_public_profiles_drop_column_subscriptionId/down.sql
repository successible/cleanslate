alter table "public"."profiles" alter column "subscriptionId" drop not null;
alter table "public"."profiles" add column "subscriptionId" text;
