import React, { useRef } from "react";
import { useEffect } from "react";

import { DataStore } from "aws-amplify";

// nodejs library that concatenates classes
import Carousel from "react-material-ui-carousel";
import { Paper } from "@material-ui/core";
import { SellerRealEstateProfile } from "../models";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import Parallax from "../common/components/Parallax.js";
import GridContainer from "../common/components/GridContainer.js";
import GridItem from "../common/components/GridItem.js";
import styles from "./sellerProfileStyle.js";

// Sections for this page
import TimingSection from "./TimingSection.js";
import HouseSection from "./HouseSection.js";
import RentBackSection from "./RentBackSection.js";
import AddressSection from "./AddressSection.js";

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

  useEffect(() => {
    var currentUser = localStorage.getItem("currentUser");
    var userObj = null;
    if (currentUser) {
      userObj = JSON.parse(currentUser);
      console.log("userObj username:" + userObj.attributes.email);
    }
    const loadREProfile = async () => {
      if (userObj) {
        setREProfile(
          await DataStore.query(SellerRealEstateProfile, (p) =>
            p.sellerReference("eq", userObj.attributes.email)
          )
        );
      }
    };
    loadREProfile();
  }, []);

  const setREProfile = (reProfileList) => {
    console.log("reProfileList.length: " + reProfileList.length);
    if (reProfileList && reProfileList.length > 0) {
      var reProfile = reProfileList[0];
      localStorage.setItem("s2rb_re_profile_id", reProfile.id);
      console.log(reProfile.id);
      //store locally for UI
      localStorage.setItem("s2rb_search_stage", reProfile.searchStage);
      localStorage.setItem("s2rb_house_type", reProfile.houseType);
      localStorage.setItem("s2rb_primary_home", reProfile.primaryHome);
      localStorage.setItem("s2rb_rentBackPeriod", reProfile.rentBackPeriod);
      localStorage.setItem(
        "s2rb_house_location",
        JSON.stringify(reProfile.address)
      );
    } else {
      console.log("No existing RE profile");
      localStorage.removeItem("s2rb_re_profile_id");
      localStorage.removeItem("s2rb_search_stage");
      localStorage.removeItem("s2rb_house_type");
      localStorage.removeItem("s2rb_primary_home");
      localStorage.removeItem("s2rb_rentBackPeriod");
      localStorage.removeItem("s2rb_house_location");
    }
  };

  return (
    <div>
      <Parallax filter image={require("../common/img/home-bg.jpg").default}>
        <div className={classes.mainRaised}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={12} lg={12}>
              <Carousel ref={sliderRef} {...settings}>
                <Paper>
                  <TimingSection sliderRef={sliderRef} />
                </Paper>
                <Paper>
                  <HouseSection sliderRef={sliderRef} />
                </Paper>
                <Paper>
                  <AddressSection sliderRef={sliderRef} />
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
