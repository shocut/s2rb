import React from "react";

import { Auth } from "aws-amplify";
import { AuthState } from "@aws-amplify/ui-components";

//add fo save data models
//import { DataStore } from 'aws-amplify';
//import { Post } from './models'
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";

// core components
import Header from "./common/components/Header.js";
import Footer from "./common/components/Footer.js";
import GridContainer from "./common/components/GridContainer.js";
import GridItem from "./common/components/GridItem.js";
import Button from "./common/components/Button.js";
import HeaderLinks from "./common/components/HeaderLinks.js";
import Parallax from "./common/components/Parallax.js";
import styles from "./landing/landingPageStyle.js";

// Sections for this page
import ProductSection from "./landing/ProductSection.js";
import FAQSection from "./landing/FAQSection.js";

const dashboardRoutes = [];
const useStyles = makeStyles(styles);

function App(props) {
  const [currentUser, setCurrentUser] = useState(null);
  const { ...rest } = props;
  const classes = useStyles();

  const onLogout = async () => {
    console.log("in log out - clearing localstorage");
    localStorage.clear();
    await Auth.signOut();
    checkLoginState();
  };

  const checkLoginState = async () => {
    try {
      console.log("Checking login state");
      const currentUser = await Auth.currentAuthenticatedUser();
      if (currentUser) {
        setCurrentUser(currentUser);
      } else {
        setCurrentUser(null);
      }
    } catch (e) {
      setCurrentUser(null);
      console.log(currentUser);
    }
  };

  useEffect(() => {
    checkLoginState();
    //throw "Unacceptable performancee";
  }, []);

  return (
    <div className="App">
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="Sell To Rent Back"
        rightLinks={<HeaderLinks onLogout={onLogout} />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
        {...rest}
      />
      <Parallax filter image={require("./common/img/home-bg.jpg").default}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>
                Bringing home-owners and investors together
              </h1>
              <h3>
                We help home-owners stay in their home by matching them with
                potential real-estate investors
              </h3>
              <br />
              <Button
                color="danger"
                size="lg"
                target="_self"
                href="#how-it-works"
                rel="noopener noreferrer"
              >
                Find out more
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <ProductSection
            onAuthStateChange={(nextAuthState) => {
              if (nextAuthState === AuthState.SignedIn) {
                checkLoginState();
              }
            }}
          />
          <FAQSection />
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default App;
