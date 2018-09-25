import React, { Component } from "react";
import { connect } from "react-redux";
import { setRecipes, addRecipeToFavorites } from "../Ducks/Reducer";
import axios from "axios";

export class Recipe extends Component {
  constructor(props) {
    super(props);

    const recipeId = props.match.params.id;

    const { recipes } = this.props;

    const recipe = recipes.find(e => {
      return e.id == recipeId;
    });

    this.state = {
      recipe: recipe
    };
  }
  addRecipeToFavorites() {
    const { label, url, image, notes } = this.state.recipe;
    axios.post("/api/myrecipes", { label, url, image, notes }).then(res => {
      this.props.addRecipeToFavorites(res.data);
    });
  }

  render() {
    const recipe = this.state.recipe;

    const recipeNotes =
      recipe.user_id !== null ? (
        <div>
          {recipe.notes}
          <input ref="notes" type="text" />
          <button>Add note</button>
        </div>
      ) : (
        ""
      );

    return (
      <div>
        <h1>{recipe.label}</h1>
        <button onClick={() => this.addRecipeToFavorites()}>
          Add to Favorites
        </button>
        <img src={recipe.image} alt="yuuuummmmm" />
        <div>
          <a target="_blank" href={recipe.url}>
            Click here for full recipe!
          </a>
        </div>
        <div>{recipeNotes}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { recipes } = state;
  return {
    recipes
  };
};

const mapDispatchToProps = {
  setRecipes,
  addRecipeToFavorites
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recipe);
