import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { logIn, setRecipes } from "../Ducks/Reducer";

class Dashboard extends Component {
  getUser() {
    axios.get("api/user-data").then(res => {
      const user = res.data;
      this.props.logIn(user);
    });
  }

  getRecipes() {
    axios.get('api/recipes').then(res => {
      const recipes = res.data
      this.props.setRecipes(recipes)
    })
  }

  componentDidMount() {
    this.getUser()
    this.getRecipes()
  }



  render() {
    console.log(this.props);

    const user = this.props;
    const { recipes } = this.props
    console.log(recipes);

    let mappedRecipes = recipes.map(recipe => {
      return <div>
        <div>{recipe.label}</div>
        <img src={recipe.image} alt="recipe" />
      </div>
    })

    return (
      <div>
        <div>
          {user.name === "" ? (
            <div>
              <p>Please login</p>
              <button>Login</button>
            </div>
          ) : user ? (
            <div>
              <div className="user-image-container">
                <img src={user.picture} alt="User" />
              </div>

              <p>{user.name}</p>
            </div>
          ) : (
                <div>
                  <p>Please login</p>
                  <button>Login</button>
                </div>
              )}
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
  }
};

const mapDispatchToProps = {
  logIn,
  setRecipes

};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
