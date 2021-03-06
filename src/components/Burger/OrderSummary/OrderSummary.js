import React, { Component } from "react";
import Aux from "../../../hoc/Auxiliary";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  componentWillUpdate() {
    console.log("OrderSummary will update");
  }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
      return (
        <li key={igKey}>
          <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
          {this.props.ingredients[igKey]}
        </li>
      );
    });
    return (
      <Aux>
        <h3>Your order</h3>
        <p>Delicious burger with fallowing ingredients: </p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total Price: {this.props.price.toFixed(2)}</strong>
        </p>
        <p>Continue to Checkout?</p>
        <Button type="Danger" clicked={this.props.modalClosed}>
          Cancel
        </Button>
        <Button type="Success" clicked={this.props.continue}>
          Continue
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
