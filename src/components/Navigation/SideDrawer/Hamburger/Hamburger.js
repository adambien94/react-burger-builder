import React from "react";
import classes from "./Hamburger.css";

const hamburger = props => (
  <div className={classes.Hamburger} onClick={props.clicked}>
    ☰
  </div>
);

export default hamburger;
