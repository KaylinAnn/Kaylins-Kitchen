const initialState = {
  user: {
    id: "",
    auth0id: "",
    name: "",
    email: "",
    picture: ""
  },
  usersPantry: [],
  ingredients: [],
  recipes: [],
};

const LOGGED_IN = "LOGGED_IN";
const SET_USER_PANTRY = "SET_USER_PANTRY";
const SET_RECIPES = "SET_RECIPES";
const LOGGED_OUT = "LOGGED_OUT";
const SET_ALL_INGREDIENTS = 'SET_ALL_INGREDIENTS';
const ADD_INGREDIENT_TO_PANTRY = 'ADD_INGREDIENT_TO_PANTRY';
const DELETE_INGREDIENT_FROM_PANTRY = 'DELETE_INGREDIENT_FROM_PANTRY';



export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGGED_IN:
      return { ...state, user: action.payload };
    case LOGGED_OUT:
      return { ...state, user: null };
    case SET_USER_PANTRY:
      return { ...state, usersPantry: action.payload };
    case SET_RECIPES:
      return { ...state, recipes: action.payload };
    case SET_ALL_INGREDIENTS:
      return { ...state, ingredients: action.payload };
    case ADD_INGREDIENT_TO_PANTRY:
      return { ...state, usersPantry: action.payload };
    case DELETE_INGREDIENT_FROM_PANTRY:
      return { ...state, usersPantry: action.payload }
    default:
      return state;
  }
}

export function logIn(user) {
  return {
    type: LOGGED_IN,
    payload: user
  };
}

export function logOut() {
  return {
    type: LOGGED_OUT,
  };
}

export function setUsersPantry(usersPantry) {
  return {
    type: SET_USER_PANTRY,
    payload: usersPantry
  }
}

export function setRecipes(recipes) {
  return {
    type: SET_RECIPES,
    payload: recipes
  }
}

export function setAllIngredients(ingredients) {
  return {
    type: SET_ALL_INGREDIENTS,
    payload: ingredients
  }
}

export function addIngredientToPantry(usersPantry) {
  return {
    type: ADD_INGREDIENT_TO_PANTRY,
    payload: usersPantry
  }
}

export function deleteIngredientFromPantry(usersPantry) {
  return {
    type: DELETE_INGREDIENT_FROM_PANTRY,
    payload: usersPantry
  }
}