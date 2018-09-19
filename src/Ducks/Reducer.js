const initialState = {
  user: {
    id: "",
    auth0id: "",
    name: "",
    email: "",
    picture: ""
  },
  ingredients: [
    {
      id: "",
      name: "",
      user_id: ""
    }
  ],
  recipes: [
    {
      recipe: {
        label: "Teriyaki Chicken",
        image:
          "https://www.edamam.com/web-img/262/262b4353ca25074178ead2a07cdf7dc1.jpg",

        url:
          "http://www.davidlebovitz.com/2012/12/chicken-teriyaki-recipe-japanese-farm-food/",

        ingredientLines: [
          "1/2 cup (125ml) mirin",
          "1/2 cup (125ml) soy sauce",
          "One 2-inch (5cm) piece of fresh ginger, peeled and grated",
          "2-pounds (900g) boneless chicken thighs (4-8 thighs, depending on size)"
        ],

        notes: ""
      }
    }
  ]
};

const LOGGED_IN = "LOGGED_IN";
const SET_INGREDIENTS = "SET_INGREDIENTS";
const SET_RECIPES = "SET_RECIPES";
const LOGGED_OUT = "LOGGED_OUT";
const CREATE_INGREDIENT = "CREATE_INGREDIENT";

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGGED_IN:
      return { ...state, user: action.payload };
    case LOGGED_OUT:
      return { ...state, user: null };
    case SET_INGREDIENTS:
      return { ...state, ingredients: action.payload };
    case SET_RECIPES:
      return { ...state, recipes: action.payload };
    case CREATE_INGREDIENT:
      return { ...state, Ingredients: action.payload };

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
    type: LOGGED_OUT
  };
}

export function SetIngredients(ingredients) {
  return {
    type: SET_INGREDIENTS,
    payload: ingredients
  };
}

export function SetRecipes(recipes) {
  return {
    type: SET_RECIPES,
    payload: recipes
  };
}

export function CreateIngredient(name, user_id) {
  return {
    type: CREATE_INGREDIENT,
    payload: name,
    user_id
  };
}
