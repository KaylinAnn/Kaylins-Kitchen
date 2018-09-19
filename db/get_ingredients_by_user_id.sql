select * from user_pantry
inner join ingredients on user_pantry.ingredient_id=ingredients.id
where user_pantry.user_id=$1