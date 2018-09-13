import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { SetRecipes } from "../Ducks/Reducer";

export class Profile extends Component {
  render() {
    const { recipes } = this.props;
    let mappedRecipes = recipes
      ? recipes.map(recipe => {
          console.log(recipe.recipe);

          return (
            <div>
              <h2>{recipe.recipe.label}</h2>
              <img src={recipe.recipe.image} />
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
  SetRecipes
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
