import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    purchasable: false,
    purchasing: false
  };

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.updatePurchaseState(this.props.ingredients);
    }
  }

  updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(key => {
        return ingredients[key];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    this.setState({ purchasable: sum > 0 });
  };

  updatePurchasingHandler = () => {
    this.setState({
      purchasing: true
    });
  };

  purchaseContinueHandler = () => {
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString
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
          purchasable={this.state.purchasable}
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
