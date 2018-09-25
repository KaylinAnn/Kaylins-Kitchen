import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { logIn, setRecipes } from "../Ducks/Reducer";
import { Link } from "react-router-dom";

class Dashboard extends Component {
  getUser() {
    axios.get("api/user-data").then(res => {
      const user = res.data;
      this.props.logIn(user);
    });
  }

  getRecipes() {
    axios.get("api/recipes").then(res => {
      const recipes = res.data;
      this.props.setRecipes(recipes);
    });
  }

  componentDidMount() {
    this.getUser();
    this.getRecipes();
  }

  render() {
    const { recipes } = this.props;

    let mappedRecipes = recipes.map(recipe => {
      return (
        <div>
          <div>{recipe.label}</div>
          <Link to={`/recipe/${recipe.id}`}>
            <a href={`/recipe/${recipe.id}`}>
              <img src={recipe.image} alt="recipe" />
            </a>
          </Link>
        </div>
      );
    });

    return (
      <div>
        <div>
          <div>{mappedRecipes}</div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  const { user, recipes } = state;
  return {
    user,
    recipes
  };
};

const mapDispatchToProps = {
  logIn,
  setRecipes
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
