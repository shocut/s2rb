import React from "react";

import { useEffect } from "react";
import { Auth } from "aws-amplify";

import Header from "../common/components/Header.js";
import HeaderLinks from "../common/components/HeaderLinks.js";

import { DataStore } from "aws-amplify";

// nodejs library that concatenates classes
import { SellerRealEstateProfile } from "../models";

// @material-ui/core components
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Parallax from "../common/components/Parallax.js";
import styles from "./timelineStyle.js";
import GridContainer from "../common/components/GridContainer.js";
import GridItem from "../common/components/GridItem.js";

// Sections for this page

/*
import MortgageSection from "./Sections/MortgageSection.js";
*/

const useStyles = makeStyles(styles);

export default function TimeLine(props) {
  const classes = useStyles();
  const dashboardRoutes = [];
  const { ...rest } = props;

  const onLogout = async () => {
    await Auth.signOut();
    localStorage.removeItem("currentUser");
  };

  useEffect(() => {
    var userObj = null;
    var currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      userObj = JSON.parse(currentUser);
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
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="Sell To Rent Back"
        rightLinks={<HeaderLinks onLogout={onLogout} />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "dark",
        }}
        {...rest}
      />
      <Parallax
        smallheader
        filter
        image={require("../common/img/header-bg.jpg").default}
      />

      <GridContainer justify="center" className={classes.darkbg}>
        <GridItem xs={12} sm={12} md={12} lg={12}>
          <Paper>Timeline Coomponent</Paper>
        </GridItem>
      </GridContainer>
    </div>
  );
}
