SELECT * FROM recipes
where user_id is null
ORDER BY RANDOM()
LIMIT 4;