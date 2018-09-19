create table ingredients(
id serial primary key,
name text not null
)

create table user_pantry(
user_id integer,
ingredient_id integer,
foreign key (user_id) references users(id),
foreign key (ingredient_id) references ingredients(id)
);

create table recipes(
id serial primary key,
label text,
user_id integer,
url text,
image text,
notes text,
foreign key (user_id) references users(id)
);

create table recipe_ingredients(
recipe_id integer,
ingredient_id integer,
foreign key (recipe_id) references recipes(id),
foreign key (ingredient_id) references ingredients(id)
);