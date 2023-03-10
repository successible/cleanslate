alter table "public"."events" alter column "updatedAt" set default now();
alter table "public"."events" alter column "updatedAt" drop not null;
alter table "public"."events" add column "updatedAt" timestamptz;
