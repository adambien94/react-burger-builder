import React from "react";
import classes from "./Button.css";

const button = props => {
  let buttonClasses = !props.disabled
    ? [classes.Button, classes[props.type]]
    : [classes.Button, classes[props.type], classes.Disabled];

  return (
    <button
      disabled={props.disabled}
      className={buttonClasses.join(" ")}
      onClick={props.clicked}
    >
      {props.children}
    </button>
  );
};

export default button;
