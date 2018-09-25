import React, { Component } from "react";
import { connect } from "react-redux";
import { setRecipes, deleteRecipeFromUsersFavorites } from "../Ducks/Reducer";
import axios from "axios";
import { Link } from "react-router-dom";

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
    let mappedFavoriteRecipes = recipes
      ? recipes.map(recipe => {
          return (
            <div>
              <div key={recipe.id}>{recipe.label}</div>
              <Link to={`/recipe/${recipe.id}`}>
                <a href={`/recipe/${recipe.id}`}>
                  <img src={recipe.image} alt="recipe" />
                </a>
              </Link>
              <button
                onClick={() => this.deleteRecipeFromUsersFavorites(recipe.id)}
              >
                delete
              </button>
            </div>
          );
        })
      : "No saved recipes.";
    const matchedRecipes = this.state.matchedRecipes;
    let mappedMatchedRecipes = matchedRecipes
      ? matchedRecipes.map(recipe => {
          return (
            <div>
              <div key={recipe.label}>{recipe.label}</div>
              <Link to={`/recipe/${recipe.id}`}>
                <a href={`/recipe/${recipe.id}`}>
                  <img src={recipe.image} alt="recipe" />
                </a>
              </Link>
              <div>
                {recipe.ingredients.map(e => {
                  return (
                    <div>
                      <div>{e.name}</div>
                      <div>{e.hasIngredient === true ? "yes" : "no"}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })
      : "No Matched Recipes. Please check your Pantry.";

    return (
      <div>
        <div>
          <h1>Favorites</h1>
          <div>{mappedFavoriteRecipes}</div>
        </div>
        <div>
          <h1>Your Matched Recipes</h1>
          <div>{mappedMatchedRecipes}</div>
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
