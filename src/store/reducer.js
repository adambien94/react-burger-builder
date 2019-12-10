import * as actionTypes from "./actions";

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
  },
  price: 0
};

const INGREDIENT_PRICING = {
  salad: 0.5,
  bacon: 1,
  cheese: 0.75,
  meat: 2
};

const reducer = (state = initialState, action) => {
  const oldCount = state.ingredients[action.ingredientType];

  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        price: state.price + INGREDIENT_PRICING[action.ingredientType],
        ingredients: {
          ...state.ingredients,
          [action.ingredientType]: oldCount + 1
        }
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        price: state.price - INGREDIENT_PRICING[action.ingredientType],
        ingredients: {
          ...state.ingredients,
          [action.ingredientType]: oldCount - 1
        }
      };
  }

  return state;
};

export default reducer;
