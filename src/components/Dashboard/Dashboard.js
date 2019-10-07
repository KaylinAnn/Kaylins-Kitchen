import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { logIn, setRecipes } from "../../Ducks/Reducer";
import { Link } from "react-router-dom";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      bev: []
    };
  }
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

  getDrink() {
    axios.get("api/drink").then(res => {
      const bev = res.data.drinks;
      console.log(res.data);

      this.setState({
        bev: bev
      });
    });
  }

  componentDidMount() {
    this.getUser();
    this.getRecipes();
    this.getDrink();
  }

  render() {
    const { recipes } = this.props;

    let mappedRecipes = recipes.map(recipe => {
      return (
        <div key={recipe.id} className="four-recipes">
          <div className="recipe-label">{recipe.label}</div>
          <Link to={`/recipe/${recipe.id}`}>
            <img src={recipe.image} alt="recipe" />
          </Link>
        </div>
      );
    });

    console.log(this.state.bev);


    const drink = this.state.bev.map(e => {
      return (
        <div key={e.strDrink} className="drink">
          <img className="drinkPic" src={e.strDrinkThumb} alt="drink pic" />
          <div className="drinkName-Info">
            <div className="drinkName">{e.strDrink}</div>
            <div className="drinkInfo">
              <div className="drinkIngredients">
                <div>
                  {e.strMeasure1} {e.strIngredient1}
                </div>
                <div>
                  {e.strMeasure2} {e.strIngredient2}
                </div>
                <div>
                  {e.strMeasure3} {e.strIngredient3}
                </div>
                <div>
                  {e.strMeasure4} {e.strIngredient4}
                </div>
                <div>
                  {e.strMeasure5} {e.strIngredient5}
                </div>
                <div>
                  {e.strMeasure6} {e.strIngredient6}
                </div>
                <div>
                  {e.strMeasure7} {e.strIngredient7}
                </div>
                <div>
                  {e.strMeasure8} {e.strIngredient8}
                </div>
                <div>
                  {e.strMeasure9} {e.strIngredient9}
                </div>
                <div>
                  {e.strMeasure10} {e.strIngredient10}
                </div>
              </div>
              <div className="drinkInstructions">{e.strInstructions}</div>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className="dashboard">
        <div>
          <div className="favoritesBox">
            <h1 className="featured">FEATURED RECIPES</h1>
          </div>
          <div className="recipes">{mappedRecipes}</div>
        </div>
        <div className="video">
          <iframe
            title="FeaturedVideo"
            className="iframe"
            width="620"
            height="415"
            src="https://www.youtube.com/embed/Z7mqj5stFMg?controls=0"
          />
        </div>
        <div className="favoritesBox">
          <h1 className="featured">ENJOY A DRINK!</h1>
        </div>
        <div>{drink}</div>
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
