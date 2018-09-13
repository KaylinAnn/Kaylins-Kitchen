module.exports = {
  getAllRecipes: (req, res) => {
    const db = req.app.get("db");
    db.get_recipes_by_user_id(2)
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
    db.get_ingredients_by_user_id(2)
      .then(ingredients => {
        res.status(200).send(ingredients);
      })
      .catch(error => {
        console.log(error);

        res.status(500).send("error");
      });
  }
};
