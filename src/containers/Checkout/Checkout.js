import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

class Checkout extends Component {
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("checkout/contact-data");
  };

  render() {
    console.log(this.props.ingredients);
    let summary = this.props.ingredients ? (
      <div>
        <CheckoutSummary
          ingredients={this.props.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          // render={props => <ContactData ingredients={this.props.ingredients}
          component={ContactData}
        />
      </div>
    ) : (
      <Redirect to="/" />
    );

    return summary;
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients
  };
};

export default connect(mapStateToProps)(Checkout);
