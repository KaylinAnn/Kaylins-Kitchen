import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { SetIngredients } from "../Ducks/Reducer";

export class Pantry extends Component {
  componentDidMount() {
    axios.get("api/ingredients").then(res => {
      const ingredient = res.data;
      this.props.SetIngredients(ingredient);
    });
  }
  render() {
    console.log(this.props);

    const { ingredients } = this.props;
    let mappedIngredients = ingredients
      ? ingredients.map(ingredient => {
          return <div key={ingredient.id}>{ingredient.name}</div>;
        })
      : "";
    // const { name } = ingredients[0];
    // console.log(name);

    return (
      <div>
        <h1>Pantry</h1>
        <div>ingredients: {mappedIngredients}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { ingredients } = state;
  return {
    ingredients
  };
};

const mapDispatchToProps = {
  SetIngredients
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pantry);
