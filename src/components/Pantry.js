import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import greenArrow from "../images/arrow-green.png";
import redArrow from "../images/arrow-red.png";
import {
  setUsersPantry,
  setAllIngredients,
  addIngredientToPantry,
  deleteIngredientFromPantry
} from "../Ducks/Reducer";

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
              <div key={item.id}>
                <div>{item.name}</div>
                <button className="button-container">
                  <img
                    alt="delete button"
                    className="delete-from-pantry-btn"
                    onClick={() => this.deleteIngredientFromPantry(item.id)}
                    src={redArrow}
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
        <div key={ingred.id}>
          <div key={ingred.id}>{ingred.name}</div>
          <button className="button-container">
            <img
              alt="add button"
              className="add-button"
              onClick={() => this.addIngredientToPantry(ingred.id)}
              src={greenArrow}
            />
          </button>
        </div>
      );
    });

    return (
      <div className="pantry-body">
        <div className="pantry">
          <div className="pantryItems-container">
            <h1 className="pantry-headers">Your Pantry</h1>
            <div className="pantryItems">
              <div className="scrollbar">{mappedPantry}</div>
            </div>
          </div>
          {/* <div className="arrows">
            <img className="left-arrow" src={Arrow} alt="switch" />
            <img className="right-arrow" src={Arrow} alt="switch" />
          </div> */}
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
