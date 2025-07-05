alter table "public"."profiles" add column "apiTokenLastRegenerated" timestamptz
 not null default now();
