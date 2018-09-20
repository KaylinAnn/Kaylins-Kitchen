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



export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGGED_IN:
      return { ...state, user: action.payload };
    case LOGGED_OUT:
      return { ...state, user: null };
    case SET_USER_PANTRY:
      return { ...state, usersPantry: action.payload };
    case SET_RECIPES:
      return { ...state, recipes: action.payload }
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