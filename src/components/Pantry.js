import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setUsersPantry } from "../Ducks/Reducer";

export class Pantry extends Component {
  componentDidMount() {
    axios.get("api/myingredients").then(res => {
      const usersPantry = res.data;
      this.props.setUsersPantry(usersPantry);
    });
  }

  render() {

    const { usersPantry } = this.props;
    let mappedIngredients = usersPantry
      ? usersPantry.map(item => {
        return <div key={item.id}>{item.name}</div>;
      })
      : "To start, add ingredient to Pantry";


    return (
      <div>
        <h1>Pantry</h1>
        {mappedIngredients}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { usersPantry, user } = state;
  return {
    usersPantry,
    user
  };
};

const mapDispatchToProps = {
  setUsersPantry
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pantry);
