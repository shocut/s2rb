import React, { useRef } from "react";
// nodejs library that concatenates classes
import Carousel from "react-material-ui-carousel";
import { Paper } from "@material-ui/core";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import Parallax from "../common/components/Parallax.js";
import GridContainer from "../common/components/GridContainer.js";
import GridItem from "../common/components/GridItem.js";
import styles from "../common/jss/sellerProfileStyle.js";

// Sections for this page
import TimingSection from "./TimingSection.js";
import HouseSection from "./HouseSection.js";
import RentBackSection from "./RentBackSection.js";

/*
import MortgageSection from "./Sections/MortgageSection.js";
*/

const useStyles = makeStyles(styles);

export default function SellerProfile() {
  const classes = useStyles();
  const sliderRef = useRef();
  const settings = {
    autoPlay: false,
    interval: 1000000,
    animation: "slide",
    cycleNavigation: false,
    slidesToScroll: 1,
    indicators: false,
    navButtonsAlwaysInvisible: true,
  };

  return (
    <div>
      <Parallax filter image={require("../common/img/home-bg.jpg").default}>
        <div className={classes.mainRaised}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={12}>
              <Carousel ref={sliderRef} {...settings}>
                <Paper>
                  <TimingSection sliderRef={sliderRef} />
                </Paper>
                <Paper>
                  <HouseSection sliderRef={sliderRef} />
                </Paper>
                <Paper>
                  <RentBackSection sliderRef={sliderRef} />
                </Paper>
              </Carousel>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
    </div>
  );
}
