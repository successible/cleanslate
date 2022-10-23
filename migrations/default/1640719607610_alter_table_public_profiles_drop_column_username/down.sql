alter table "public"."profiles" add constraint "profiles_username_key" unique (username);
alter table "public"."profiles" alter column "username" drop not null;
alter table "public"."profiles" add column "username" text;
