import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";

const CheckoutSummary = props => {
  const styles = {
    wrapper: {
      padding: "0 40px",
      textAlign: "center"
    }
  };

  return (
    <div style={styles.wrapper}>
      <h2>We hope it tastes well!</h2>
      <div>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button type="Danger" clicked={props.checkoutCancelled}>
        CANCEL
      </Button>
      <Button type="Success" clicked={props.checkoutContinued}>
        CONTINUE
      </Button>
    </div>
  );
};

export default CheckoutSummary;
