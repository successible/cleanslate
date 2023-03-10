alter table "public"."profiles" add constraint "profiles_customerId_key" unique (customerId);
alter table "public"."profiles" alter column "customerId" drop not null;
alter table "public"."profiles" add column "customerId" text;
