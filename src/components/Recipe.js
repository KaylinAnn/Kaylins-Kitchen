import React, { Component } from "react";
import { connect } from "react-redux";
import { setRecipes } from "../Ducks/Reducer";

export class Recipe extends Component {
  render() {
    const { recipes } = this.props;
    let mappedRecipes = recipes
      ? recipes.map(recipe => {
        console.log(recipe.recipe);

        return (
          <div>
            <h2>{recipe.recipe.label}</h2>
            <img src={recipe.recipe.image} alt="recipe" />
            <a href={recipe.recipe.url}>Get Recipe Instructions here!</a>

            <ul>
              {recipe.recipe.ingredientLines.map(ingredient => {
                return <div>{ingredient}</div>;
              })}
            </ul>
          </div>
        );
      })
      : "No recipes saved";

    return (
      <div>
        <h1>Profille</h1>
        <div>{mappedRecipes}</div>
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
  setRecipes
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recipe);
