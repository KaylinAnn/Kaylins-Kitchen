import React, { Component } from "react";
import { connect } from "react-redux";
import {
  setRecipes,
  addRecipeToFavorites,
  updateRecipeNotes
} from "../Ducks/Reducer";
import axios from "axios";

export class Recipe extends Component {
  constructor(props) {
    super(props);

    const { recipes } = this.props;
    const recipeId = this.props.match.params.id;

    const recipe = recipes.find(e => {
      return Number(e.id) === Number(recipeId);
    });

    this.state = {
      recipes: [],
      recipe: recipe
    };
  }

  componentDidMount() {
    axios.get("/api/allrecipes").then(res => {
      const recipeId = this.props.match.params.id;

      const recipe = res.data.find(e => {
        return Number(e.id) === Number(recipeId);
      });

      this.setState({
        recipes: res.data,
        recipe: recipe
      });
    });
  }

  addRecipeToFavorites() {
    const { label, url, image, notes } = this.state.recipe;
    axios.post("/api/myrecipes", { label, url, image, notes }).then(res => {
      this.props.addRecipeToFavorites(res.data);
    });
  }

  updateRecipeNotes() {
    const { id } = this.state.recipe;

    axios
      .patch(`/api/recipe/${id}`, {
        notes: this.refs.notes.value,
        id: id
      })
      .then(res => {
        this.props.updateRecipeNotes(res.data);
        this.componentDidMount();
        this.refs.notes.value = "";
      });
  }

  render() {
    const { recipe } = this.state;

    const recipeNotes =
      recipe && recipe.user_id !== null ? (
        <div className="single-recipe-notes">
          {recipe.notes}
          <input className="notes-input" ref="notes" type="text" />
          <button
            className="add-note-button"
            onClick={() => this.updateRecipeNotes()}
          >
            Add Note
          </button>
        </div>
      ) : (
        ""
      );

    return (
      <div className="single-recipe">
        <div className="single-recipe-container">
          {recipe ? (
            <div className="single-recipe-container">
              <h1 className="single-recipe-name">{recipe.label}</h1>
              <div className="img-add-button-url">
                <img
                  className="single-recipe-img"
                  src={recipe.image}
                  alt="yuuuummmmm"
                />
                <div className="add-button-url">
                  <button
                    className="add-to-recipes"
                    onClick={() => this.addRecipeToFavorites()}
                  >
                    Add to Favorites
                  </button>

                  <div>
                    <a target="_blank" href={recipe.url}>
                      Click here for full recipe!
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            "no recipe here"
          )}
          <div className="single-recipe-notes">{recipeNotes}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { recipes } = state;
  return {
    recipes
  };
};

const mapDispatchToProps = {
  setRecipes,
  addRecipeToFavorites,
  updateRecipeNotes
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recipe);
