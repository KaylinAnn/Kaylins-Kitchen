import React, { Component } from "react";
import { connect } from "react-redux";
import { SetRecipes } from "../Ducks/Reducer";
import { Link } from "react-router-dom";

export class Profile extends Component {
  render() {
    const { recipes } = this.props;
    let mappedRecipes = recipes
      ? recipes.map(recipe => {
          console.log(recipe.recipe);

          return (
            <div>
              <h2>{recipe.recipe.label}</h2>
              <Link to="/recipe">
                <img src={recipe.recipe.image} alt="Your Recipes" />
              </Link>
            </div>
          );
        })
      : "No recipes saved";

    return (
      <div>
        <h1>Profile</h1>
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
