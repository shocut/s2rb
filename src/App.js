import { Auth } from 'aws-amplify';
import { AuthState } from '@aws-amplify/ui-components';

//add fo save data models
//import { DataStore } from 'aws-amplify';
//import { Post } from './models'
import { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import LoginPopup from './LoginPopup';

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
import WorkSection from "./landing/WorkSection.js";
import FAQSection from "./landing/FAQSection.js";

const dashboardRoutes = [];
const useStyles = makeStyles(styles);

function App(props) {
  const [currentUser, setCurrentUser] = useState()
  const [showAuthenticator, setShowAuthenticator] = useState(false)
  const { ...rest } = props;
  const classes = useStyles();

  const checkLoginState = async () => {
    try {
      const currentUser = await Auth.currentAuthenticatedUser()
      if (currentUser) {
        setCurrentUser(currentUser)
        setShowAuthenticator(false)
      }
    } catch (e) {
      setCurrentUser(null)
    }
  }

  return (

    <div className="App">
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="Sell To Rent Back"
        rightLinks={<HeaderLinks currentUser={currentUser} />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "dark",
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
      {showAuthenticator && 
        <LoginPopup
        onAuthStateChange={(nextAuthState) => { if (nextAuthState === AuthState.SignedIn) { checkLoginState() } }}
          onCancel={() => setShowAuthenticator(false)}/>}
      <Footer />
    </div>
  );
}

export default App;
