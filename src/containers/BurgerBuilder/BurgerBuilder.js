import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";
import axios from "../../axios-orders";

class BurgerBuilder extends Component {
  state = {
    purchasing: false
  };

  updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(key => {
        return ingredients[key];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };

  updatePurchasingHandler = () => {
    this.setState({
      purchasing: true
    });
  };

  purchaseContinueHandler = () => {
    const order = {
      ingredients: "pomidor",
      customer: {
        name: "Adam",
        age: 99,
        address: {
          street: "rynek",
          country: "poland"
        }
      }
    };

    axios
      .post("/orders.json", order)
      .then(response => console.log(response))
      .catch(error => console.log(error));

    // const queryParams = [];
    // for (let i in this.props.ingredients) {
    //   queryParams.push(
    //     encodeURIComponent(i) +
    //       "=" +
    //       encodeURIComponent(this.props.ingredients[i])
    //   );
    // }
    // const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout"
      // search: "?" + queryString
    });
  };

  purchaseCancalHandler = () => {
    this.setState({
      purchasing: false
    });
  };

  render() {
    const disabledInfo = { ...this.props.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={() => this.purchaseCancalHandler()}
        >
          <OrderSummary
            ingredients={this.props.ingredients}
            modalClosed={() => this.purchaseCancalHandler()}
            continue={() => this.purchaseContinueHandler()}
            price={this.props.price}
          />
        </Modal>
        <Burger
          ingredients={this.props.ingredients}
          totalPrice={this.props.price}
        />
        <BuildControls
          ingredientAdded={type => this.props.onAddIngredient(type)}
          ingredientRemoved={type => this.props.onRemoveIngredient(type)}
          purchasable={this.updatePurchaseState(this.props.ingredients)}
          disabled={disabledInfo}
          price={this.props.price}
          ordered={this.updatePurchasingHandler}
        ></BuildControls>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    price: state.price
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredient: type =>
      dispatch({
        type: actionTypes.ADD_INGREDIENT,
        ingredientType: type
      }),
    onRemoveIngredient: type =>
      dispatch({
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientType: type
      })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);
