select recipes.*, users.auth0_id
from recipes
inner join users on recipes.user_id=users.id
where users.id=$1