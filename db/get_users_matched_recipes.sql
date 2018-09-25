select case when (user_pantry.user_id is null) then 0 else 1 end, recipes.*, ingredients.name
from recipes
inner join recipe_ingredients on recipe_ingredients.recipe_id = recipes.id 
inner join ingredients on ingredients.id = recipe_ingredients.ingredient_id
left join user_pantry on user_pantry.ingredient_id = ingredients.id
where recipes.id in (
    select recipes.id 
    from recipes
    inner join recipe_ingredients on recipe_ingredients.recipe_id = recipes.id 
    inner join ingredients on ingredients.id = recipe_ingredients.ingredient_id
    where recipes.user_id is null
    AND ingredients.id in (
        select ingredient_id from user_pantry
        inner join ingredients on user_pantry.ingredient_id=ingredients.id
        where user_pantry.user_id=$1
    )
)