import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";

// @material-ui/icons

// core components
import Header from "common/components/Header.js";
import Footer from "common/components/Footer.js";
import GridContainer from "common/components/GridContainer.js";
import GridItem from "common/components/GridItem.js";
import Button from "common/components/Button.js";
import HeaderLinks from "common/components/HeaderLinks.js";
import Parallax from "common/components/Parallax.js";
import logoImg from "common/img/s2rb_logo.png";

import styles from "landingPageStyle.js";

// Sections for this page
import ProductSection from "./ProductSection.js";
import WorkSection from "./WorkSection.js";
import FAQSection from "./FAQSection.js";

const dashboardRoutes = [];
const useStyles = makeStyles(styles);

export default function LandingPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const [authState, setAuthState] = React.useState();
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
      console.log("authData: " + authData);
    });
  }, []);

  console.log(authState);
  const authStatus = AuthState.SignedIn;
  const userName = user ? user.username : "";
  console.log("authStatus: " + authStatus);
  console.log("userName: " + userName);

  return (
    <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="Sell To Rent Back"
        logoImg={`url(${logoImg})`}
        rightLinks={<HeaderLinks authStatus={authStatus} userName={userName} />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "dark",
        }}
        {...rest}
      />
      <Parallax filter image={require("assets/img/home-bg.jpg").default}>
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
                How this works
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <ProductSection />
          <WorkSection />
          <FAQSection />
        </div>
      </div>
      <Footer />
    </div>
  );
}
