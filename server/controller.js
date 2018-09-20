module.exports = {
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
      .then(ingredients => {
        res.status(200).send(ingredients);
      })
      .catch(error => {
        console.log(error);
        res.status(500).send(error);
      });
  }
};
