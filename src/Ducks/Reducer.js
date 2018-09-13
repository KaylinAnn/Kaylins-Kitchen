const initialState = {
  user: {
    id: "",
    auth0id: "",
    name: "",
    email: "",
    picture: ""
  },
  ingredients: [],
  recipes: [
    {
      recipe: {
        uri:
          "http://www.edamam.com/ontologies/edamam.owl#recipe_7bf4a371c6884d809682a72808da7dc2",
        label: "Teriyaki Chicken",
        image:
          "https://www.edamam.com/web-img/262/262b4353ca25074178ead2a07cdf7dc1.jpg",
        source: "David Lebovitz",
        url:
          "http://www.davidlebovitz.com/2012/12/chicken-teriyaki-recipe-japanese-farm-food/",
        shareAs:
          "http://www.edamam.com/recipe/teriyaki-chicken-7bf4a371c6884d809682a72808da7dc2/chicken",
        yield: 6.0,
        dietLabels: ["Low-Carb"],
        healthLabels: [
          "Sugar-Conscious",
          "Peanut-Free",
          "Tree-Nut-Free",
          "Alcohol-Free"
        ],
        cautions: [],
        ingredientLines: [
          "1/2 cup (125ml) mirin",
          "1/2 cup (125ml) soy sauce",
          "One 2-inch (5cm) piece of fresh ginger, peeled and grated",
          "2-pounds (900g) boneless chicken thighs (4-8 thighs, depending on size)"
        ],
        ingredients: [
          {
            text: "1/2 cup (125ml) mirin",
            weight: 122.99850757795392
          },
          {
            text: "1/2 cup (125ml) soy sauce",
            weight: 134.72774670265568
          },
          {
            text: "One 2-inch (5cm) piece of fresh ginger, peeled and grated",
            weight: 15.0
          },
          {
            text:
              "2-pounds (900g) boneless chicken thighs (4-8 thighs, depending on size)",
            weight: 907.18474
          }
        ]
      }
    }
  ]
};

const LOGGED_IN = "LOGGED_IN";
const SET_INGREDIENTS = "SET_INGREDIENTS";
const SET_RECIPES = "SET_RECIPES";

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGGED_IN:
      return { ...state, user: action.payload };
    case SET_INGREDIENTS:
      return { ...state, ingredients: action.payload };
    case SET_RECIPES:
      return { ...state, recipes: action.payload };

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
