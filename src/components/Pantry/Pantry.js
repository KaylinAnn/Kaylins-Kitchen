import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

import {
  setUsersPantry,
  setAllIngredients,
  addIngredientToPantry,
  deleteIngredientFromPantry
} from "../../Ducks/Reducer";

export class Pantry extends Component {
  componentDidMount() {
    this.getUsersPantry();
    this.getAllIngredients();
  }

  getUsersPantry() {
    return axios.get("api/myingredients").then(res => {
      const usersPantry = res.data;
      this.props.setUsersPantry(usersPantry);
    });
  }

  getAllIngredients() {
    return axios.get("api/ingredients").then(res => {
      const ingredients = res.data;
      this.props.setAllIngredients(ingredients);
    });
  }

  addIngredientToPantry(ingredId) {
    return axios.post("api/myingredients", { id: ingredId }).then(res => {
      console.log(res.data);

      this.props.addIngredientToPantry(res.data);
      this.getUsersPantry();
    });
  }

  deleteIngredientFromPantry(ingredId) {
    return axios.delete(`api/myingredients/${ingredId}`).then(res => {
      this.props.deleteIngredientFromPantry(res.data);
      this.getUsersPantry();
    });
  }

  render() {
    const { usersPantry } = this.props;

    let mappedPantry =
      usersPantry.length === 0
        ? "To start, Add Ingredient to Pantry"
        : usersPantry.map(item => {
          return (
            <div className="ingredient-pantry" key={item.id}>
              <div className="food-name-pantry">{item.name}</div>
              <button className="button-container-pantry">
                <i
                  class="fas fa-arrow-alt-circle-right"
                  onClick={() => this.deleteIngredientFromPantry(item.id)}
                />
              </button>
            </div>
          );
        });

    const { ingredients } = this.props;

    let filteredIngredients = usersPantry
      ? ingredients.filter(ingred => {
        return (
          usersPantry.filter(pantryIngred => {
            return pantryIngred.ingredient_id === ingred.id;
          }).length === 0
        );
      })
      : ingredients;

    let mappedIngredients = filteredIngredients.map(ingred => {
      return (
        <div className="ingredient" key={ingred.id}>
          <button className="button-container">
            <i
              class="fas fa-arrow-alt-circle-left"
              onClick={() => this.addIngredientToPantry(ingred.id)}
            />
          </button>
          <div className="food-name" key={ingred.id}>
            {ingred.name}
          </div>
        </div>
      );
    });

    return (
      <div className="pantry-body">
        <div className="pantry">
          <div className="ingredients-container">
            <h1 className="pantry-headers">Your Pantry</h1>
            <div className="allIngredients">
              <div className="scrollbar">{mappedPantry}</div>
            </div>
          </div>
          <div className="ingredients-container">
            <h1 className="pantry-headers">Ingredients</h1>
            <div className="allIngredients">
              <div className="scrollbar">{mappedIngredients}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { usersPantry, user, ingredients } = state;
  return {
    usersPantry,
    user,
    ingredients
  };
};

const mapDispatchToProps = {
  setUsersPantry,
  setAllIngredients,
  addIngredientToPantry,
  deleteIngredientFromPantry
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pantry);
