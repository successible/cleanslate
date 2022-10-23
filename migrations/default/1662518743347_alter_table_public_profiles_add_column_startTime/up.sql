alter table "public"."profiles" add column "startTime" timetz
 not null default '00:00:00';
