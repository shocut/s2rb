import React from "react";
import { makeStyles } from "@material-ui/core/styles";

// core components
import Header from "./common/components/Header.js";
import Parallax from "./common/components/Parallax.js";
import styles from "./landing/landingPageStyle.js";

const dashboardRoutes = [];
const useStyles = makeStyles(styles);

function CommingSoon(props) {
  const { ...rest } = props;
  const classes = useStyles();

  return (
    <div className="App">
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="Sell To Rent Back"
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
        {...rest}
      />
      <Parallax filter image={require("./common/img/home-bg.jpg").default}>
        <div className={classes.container}>S2RB.com is coming soon...</div>
      </Parallax>
    </div>
  );
}

export default CommingSoon;
