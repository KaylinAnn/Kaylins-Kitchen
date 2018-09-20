import React, { Component } from "react";
import { connect } from "react-redux";
import { setRecipes } from "../Ducks/Reducer";
import axios from 'axios'

export class Profile extends Component {
  componentDidMount() {
    axios.get("api/myrecipes").then(res => {
      const recipes = res.data;
      this.props.setRecipes(recipes);
    });
  }


  render() {
    const { recipes } = this.props;
    let mappedRecipes = recipes
      ? recipes.map(recipe => {
        return <div>
          <div key={recipe.id}>{recipe.label}</div>
          <img src={recipe.image} alt="recipe" />
        </div>
      })
      : "No saved recipes.";

    return (
      <div>
        <h1>Profile</h1>
        <div>{mappedRecipes}</div>
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
  setRecipes
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);