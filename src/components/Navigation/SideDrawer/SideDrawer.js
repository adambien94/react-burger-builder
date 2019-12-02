import React from "react";
import classes from "./SideDrawer.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Auxiliary";

const sideDrawer = props => {
  let attachedClasses = props.opened
    ? [classes.SideDrawer, classes.Open]
    : [classes.SideDrawer, classes.Close];

  return (
    <Aux>
      <Backdrop show={props.opened} clicked={props.close} />
      <div className={attachedClasses.join(" ")}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <NavigationItems />
      </div>
    </Aux>
  );
};

export default sideDrawer;
