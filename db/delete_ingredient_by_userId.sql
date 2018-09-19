delete from user_pantry
where user_id = $1
and ingredient_id = $2;