import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const addIngredient = ingredientName => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientType: ingredientName
  };
};

export const removeIngredient = ingredientName => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientType: ingredientName
  };
};

export const setIngredients = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  };
};

export const initIngredients = () => {
  return dispatch => {
    axios
      .get("/ingredients.json")
      .then(response => {
        alert("hura");
        console.log(response.data);
        dispatch(setIngredients(response.data));
      })
      .catch(error => {
        console.log("errorrrrr");
        dispatch(fetchIngredientsFailed());
      });
  };
};
