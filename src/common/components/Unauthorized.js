import React from "react";
import GridContainer from "./GridContainer.js";
import GridItem from "./GridItem.js";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../jss/footerStyle.js";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Parallax from "./Parallax.js";

const useStyles = makeStyles(styles);

const Unauthorized = () => {
  const classes = useStyles();
  return (
    <div className="App">
      <Header
        color="transparent"
        brand="Sell To Rent Back"
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
      />

      <Parallax>
        <div className={classes.container}>
          <GridContainer justify="center" className={classes.main}>
            <GridItem xs={12} sm={12} md={9} lg={7}>
              <br></br>
            </GridItem>
            <GridItem xs={12} sm={12} md={9} lg={7}>
              <h4>
                <center>
                  Please{" "}
                  <a href="/signup?ref=/app/sdashboard" target="_self">
                    <b>sign-in</b>
                  </a>{" "}
                  to your S2RB account to view your dashboard. <br />
                  If you have not yet registered, please{" "}
                  <a href="/signup?ref=/app/reprofile" target="_self">
                    <b>sign-up</b>
                  </a>{" "}
                  now for a free no obligation account.
                </center>
              </h4>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <Footer />
    </div>
  );
};

export default Unauthorized;
