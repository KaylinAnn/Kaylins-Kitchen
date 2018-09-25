delete from recipe_ingredients
where recipe_id = $2;

delete from recipes
where user_id = $1
and id = $2;