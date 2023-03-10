alter table "public"."profiles" alter column "subscribed" set default false;
alter table "public"."profiles" alter column "subscribed" drop not null;
alter table "public"."profiles" add column "subscribed" bool;
