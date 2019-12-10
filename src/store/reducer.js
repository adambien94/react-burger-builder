import * as actionTypes from "./actions";

const initialState = {
  igridients: {},
  price: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INCREMENT_PRICE:
      return {
        ...state,
        price: state.price + 1
      };
  }

  return state;
};

export default reducer;
