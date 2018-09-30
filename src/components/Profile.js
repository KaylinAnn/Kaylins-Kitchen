import React, { Component } from "react";
import { connect } from "react-redux";
import { setRecipes, deleteRecipeFromUsersFavorites } from "../Ducks/Reducer";
import axios from "axios";
import { Link } from "react-router-dom";
import check from "../images/check.png";
import x from "../images/x.png";

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matchedRecipes: []
    };
  }
  componentDidMount() {
    this.getUsersRecipes();
    this.getRecipesThatMatchUsersPantry();
  }

  getUsersRecipes() {
    axios.get("api/myrecipes").then(res => {
      const recipes = res.data;
      this.props.setRecipes(recipes);
    });
  }

  getRecipesThatMatchUsersPantry() {
    axios.get("api/matchedrecipes").then(res => {
      this.setState({
        matchedRecipes: res.data
      });
    });
  }

  deleteRecipeFromUsersFavorites(recipeId) {
    axios.delete(`api/myrecipes/${recipeId}`).then(res => {
      this.props.deleteRecipeFromUsersFavorites(res.data);
      this.componentDidMount();
    });
  }

  render() {
    const { recipes } = this.props;

    let mappedFavoriteRecipes =
      recipes.length == 0
        ? "No saved recipes."
        : recipes.map(recipe => {
            return (
              <div key={recipe.id} className="savedRecipes">
                <div className="recipe-label" key={recipe.id}>
                  {recipe.label}
                </div>
                <Link to={`/recipe/${recipe.id}`}>
                  <img src={recipe.image} alt="recipe" />
                </Link>
                <button
                  class="example_e"
                  className="button_cont"
                  align="center"
                  className="deleteButton"
                  onClick={() => this.deleteRecipeFromUsersFavorites(recipe.id)}
                >
                  REMOVE
                </button>
              </div>
            );
          });

    const matchedRecipes = this.state.matchedRecipes;

    let mappedMatchedRecipes =
      matchedRecipes.length === 0
        ? "No Matched Recipes. Please Add Ingredients to Your Pantry."
        : matchedRecipes.map(recipe => {
            return (
              <div className="mappedRecipes">
                <div className="mappedRecipe">
                  <div className="recipe-label-fav" key={recipe.label}>
                    {recipe.label}
                  </div>
                  <Link to={`/recipe/${recipe.id}`}>
                    <img src={recipe.image} alt="recipe" />
                  </Link>
                  <div>
                    {recipe.ingredients.map(e => {
                      return (
                        <div className="ingredient-name-has">
                          <div className="ingredients-name">
                            {e.hasIngredient === true ? (
                              <img
                                className="check-pic"
                                src={check}
                                alt="yes"
                              />
                            ) : (
                              <img className="x-pic" src={x} alt="no" />
                            )}
                          </div>
                          <div>{e.name}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          });

    return (
      <div className="profile">
        <div>
          <div className="favoritesBox">
            <h1 className="favorites">FAVORITES</h1>
          </div>
          <div className="recipes">{mappedFavoriteRecipes}</div>
        </div>
        <div className="profile-container">
          <h1 className="matched-text">MATCHED RECIPES</h1>
          <div className="mapped-recipes-container">{mappedMatchedRecipes}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { recipes, user } = state;
  return {
    recipes,
    user
  };
};

const mapDispatchToProps = {
  setRecipes,
  deleteRecipeFromUsersFavorites
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
