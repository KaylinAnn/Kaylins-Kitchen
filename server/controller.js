const axios = require("axios");
module.exports = {
  readRandomDrinkAPI: (req, res) => {
    axios
      .get("https://www.thecocktaildb.com/api/json/v1/1/random.php")
      .then(response => {
        const drink = response.data;
        res.status(200).send(drink);
      });
  },

  updateRecipeNotes: (req, res) => {
    const db = req.app.get("db");
    console.log(req.body);

    db.update_recipe_notes([req.body.notes, req.body.id])
      .then(recipe => {
        res.status(200).send(recipe);
      })
      .catch(error => {
        console.log(error);

        res.status(500).send("error");
      });
  },

  getAllRecipes: (req, res) => {
    const db = req.app.get("db");
    db.get_all_recipes()
      .then(recipes => {
        res.status(200).send(recipes);
      })
      .catch(error => {
        console.log(error);
        res.status(500).send("unexpected error");
      });
  },

  getRandomFourRecipes: (req, res) => {
    const db = req.app.get("db");
    db.get_four_random_recipes()
      .then(recipes => {
        res.status(200).send(recipes);
      })
      .catch(error => {
        console.log(error);
        res.status(500).send("unexpected error");
      });
  },

  getUsersRecipes: (req, res) => {
    const db = req.app.get("db");
    db.get_users_recipes(req.session.user.id)
      .then(recipes => {
        res.status(200).send(recipes);
      })
      .catch(error => {
        console.log(error);
        res.status(500).send("unexpected error");
      });
  },

  getAllIngredients: (req, res) => {
    const db = req.app.get("db");
    db.get_all_ingredients()
      .then(ingredients => {
        res.status(200).send(ingredients);
      })
      .catch(error => {
        console.log(error);
        res.status(500).send("unexpexted error");
      });
  },

  getUsersIngredients: (req, res) => {
    const db = req.app.get("db");
    db.get_ingredients_by_user_id(req.session.user.id)
      .then(ingredients => {
        res.status(200).send(ingredients);
      })
      .catch(error => {
        console.log(error);

        res.status(500).send("error");
      });
  },

  createIngredients: (req, res) => {
    const db = req.app.get("db");
    db.create_ingredient_by_user_id([req.session.user.id, req.body.id])
      .then(() => {
        res.status(200).send();
      })
      .catch(error => {
        console.log(error);

        res.status(500).send("error");
      });
  },

  deleteIngredient: (req, res) => {
    const db = req.app.get("db");
    db.delete_ingredient_by_userId([req.session.user.id, req.params.id])
      .then(usersPantry => {
        res.status(200).send(usersPantry);
      })
      .catch(error => {
        console.log(error);
        res.status(500).send("error");
      });
  },

  deleteRecipeFromUsersFavorites: (req, res) => {
    const db = req.app.get("db");
    db.delete_recipe_from_users_favorites([req.session.user.id, req.params.id])
      .then(recipes => {
        res.status(200).send(recipes);
      })
      .catch(error => {
        console.log(error);
        res.status(500).send("error");
      });
  },

  addUserRecipe: (req, res) => {
    const db = req.app.get("db");

    db.create_user_recipe([
      req.body.label,
      req.session.user.id,
      req.body.url,
      req.body.image,
      req.body.notes
    ])
      .then(recipes => {
        res.status(200).send(recipes);
      })
      .catch(error => {
        console.log(error);
        res.status(500).send("error");
      });
  },

  getRecipesThatMatchUsersPantry: (req, res) => {
    const db = req.app.get("db");
    db.get_users_matched_recipes(req.session.user.id)
      .then(matchedRecipes => {
        let reduced = matchedRecipes.reduce((prev, curr) => {
          let { id, label, url, image, notes, name } = curr;

          prev[id] = prev[id] || {
            id,
            label,
            url,
            image,
            notes,
            ingredients: []
          };
          prev[id].ingredients.push({
            name,
            hasIngredient: Boolean(curr.case)
          });
          return prev;
        }, {});
        let recipeArray = Object.keys(reduced).map(key => reduced[key]);

        res.status(200).send(recipeArray);
      })
      .catch(error => {
        console.log(error);
        res.status(500).send("error");
      });
  }
};
