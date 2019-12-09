import React, { Component } from "react";
import classes from "./ContactData.module.css";
import Button from "../../../components/UI/Button/Button";
import Input from "../../../components/UI/Input/Input";

export default class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        valid: true
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Street"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your zip code"
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Country"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      }
    },
    formIsValid: false
  };

  orderHandler = event => {
    event.preventDefault();
    alert("🍔");
  };

  inputChangeHandler = (event, elementId) => {
    const updatedForm = { ...this.state.orderForm };
    const updatedElement = { ...updatedForm[elementId] };
    updatedElement.value = event.target.value;
    if (updatedElement.validation) {
      updatedElement.valid = this.checkValidity(
        updatedElement.value,
        updatedElement.validation
      );
    }
    updatedElement.touched = true;
    updatedForm[elementId] = updatedElement;
    updatedForm[elementId].value = updatedElement.value;

    let formIsValid = true;
    for (let inputId in updatedForm) {
      formIsValid = updatedForm[inputId].valid && formIsValid;
    }

    this.setState({ orderForm: updatedForm, formIsValid: formIsValid });
  };

  checkValidity = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.maxLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formEl => (
          <Input
            key={formEl.id}
            elementType={formEl.config.elementType}
            elementConfig={formEl.config.elementConfig}
            value={formEl.config.value}
            invalid={!formEl.config.valid}
            shouldValidate={formEl.config.validation}
            touched={formEl.config.touched}
            changed={event => this.inputChangeHandler(event, formEl.id)}
          />
        ))}
        <Button type="Success" disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );

    return (
      <div className={classes.contactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}
