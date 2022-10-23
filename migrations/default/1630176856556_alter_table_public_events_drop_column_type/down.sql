alter table "public"."events" alter column "type" set default ''event'::text';
alter table "public"."events" alter column "type" drop not null;
alter table "public"."events" add column "type" text;
