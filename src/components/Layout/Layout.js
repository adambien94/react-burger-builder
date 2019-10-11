import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary";
import classes from "./Layout.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    sideDrawerOpened: false
  };

  sideDrawerClosedHandler = () => {
    this.setState({
      sideDrawerOpened: false
    });
  };

  sideDrawerOpenedHandler = () => {
    this.setState({
      sideDrawerOpened: true
    });
  };

  render() {
    return (
      <Aux>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <Toolbar open={() => this.sideDrawerOpenedHandler()}></Toolbar>
        <SideDrawer
          opened={this.state.sideDrawerOpened}
          close={() => this.sideDrawerClosedHandler()}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
