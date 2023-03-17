alter table "public"."logs" add constraint "valid_meal" check ("meal" = ANY (ARRAY['Breakfast'::text, 'Lunch'::text, 'Dinner'::text, 'Snack'::text ]));
