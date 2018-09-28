import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import Arrow from "../images/left.png";
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
    let mappedPantry = usersPantry
      ? usersPantry.map(item => {
          return (
            <div>
              <div key={item.id}>{item.name}</div>
              <button onClick={() => this.deleteIngredientFromPantry(item.id)}>
                delete
              </button>
            </div>
          );
        })
      : "To start, add ingredient to Pantry";

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
        <div>
          <div key={ingred.id}>{ingred.name}</div>
          <button onClick={() => this.addIngredientToPantry(ingred.id)}>
            add
          </button>
        </div>
      );
    });

    return (
      <div>
        <div className="pantry">
          <div className="pantryItems">
            <h1>Pantry</h1>
            {mappedPantry}
          </div>
          <div className="arrows">
            <img className="left-arrow" src={Arrow} alt="switch" />
            <img className="right-arrow" src={Arrow} alt="switch" />
          </div>
          <div className="allIngredients">{mappedIngredients}</div>
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
