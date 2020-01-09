import * as actionTypes from "../actions/actionTypes";

const initialState = {
  ingredients: {
    salad: 1,
    bacon: 1,
    cheese: 1,
    meat: 1
  },
  price: 0,
  error: false
};

const INGREDIENT_PRICING = {
  salad: 0.5,
  bacon: 1,
  cheese: 0.75,
  meat: 2
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        price: state.price + INGREDIENT_PRICING[action.ingredientType],
        ingredients: {
          ...state.ingredients,
          [action.ingredientType]: state.ingredients[action.ingredientType] + 1
        }
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        price: state.price - INGREDIENT_PRICING[action.ingredientType],
        ingredients: {
          ...state.ingredients,
          [action.ingredientType]: state.ingredients[action.ingredientType] - 1
        }
      };
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          salad: action.ingredients.salad,
          cheese: action.ingredients.cheese,
          bacon: action.ingredients.bacon,
          meat: action.ingredients.meat
        },
        error: false
      };
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true
      };
  }

  return state;
};

export default reducer;
