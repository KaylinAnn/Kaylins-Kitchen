import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { SetIngredients, CreateIngredient } from "../Ducks/Reducer";

export class Pantry extends Component {
  componentDidMount() {
    axios.get("api/ingredients").then(res => {
      const ingredient = res.data;
      this.props.SetIngredients(ingredient);
    });
  }

  createIngredient() {
    let createdIngredient = {
      name: this.refs.pantry.value,
      user_Id: this.props.user.id
    };
    console.log(this.refs.pantry.value);

    console.log(createdIngredient);
    axios.post("api/ingredients", createdIngredient).then(ingredients => {
      console.log(ingredients);
    });
  }

  handleInput() {
    if ((this.refs.pantry.value = "")) {
      alert("Opps! Please add ingredient.");
    } else {
      this.props.CreateIngredient(this.refs.pantry.value, this.props.user.id);
      this.createIngredient();
    }
  }

  render() {
    console.log(this.props.user);

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
        <input type="text" placeholder="" ref="pantry" />
        <button onClick={this.handleInput.bind(this)}>Add to Pantry</button>
        <div>ingredients: {mappedIngredients}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { ingredients, user } = state;
  return {
    ingredients,
    user
  };
};

const mapDispatchToProps = {
  SetIngredients,
  CreateIngredient
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pantry);
