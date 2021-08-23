import React from "react";

import { useEffect } from "react";
import { Auth } from "aws-amplify";

import Header from "../common/components/Header.js";
import HeaderLinks from "../common/components/HeaderLinks.js";

import { DataStore } from "aws-amplify";

// nodejs library that concatenates classes
import { SellerRealEstateProfile } from "../models";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Parallax from "../common/components/Parallax.js";
import GridContainer from "../common/components/GridContainer.js";
import GridItem from "../common/components/GridItem.js";
import Card from "../common/components/Card.js";
import CardBody from "../common/components/CardBody.js";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./custom.css";
import Avatar from "@material-ui/core/Avatar";
import AssignmentIcon from "@material-ui/icons/Assignment";
import DescriptionIcon from "@material-ui/icons/Description";
import StoreIcon from "@material-ui/icons/Store";

import { Chrono } from "react-chrono";
import data from "./timelineData";

// @material-ui/icons
//import Dashboard from "@material-ui/icons/Dashboard";
//import Schedule from "@material-ui/icons/Schedule";
//import List from "@material-ui/icons/List";

import styles from "./dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function SDashboard(props) {
  const classes = useStyles();
  const dashboardRoutes = [];
  const { ...rest } = props;
  const reProfileProgress = 30;
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
      <GridContainer justify="center" className={classes.section}>
        <GridItem xs={6} sm={3} md={2}>
          <Card className={classes.dashCard}>
            <CardBody>
              <div style={{ width: 75, height: 75 }} className={classes.center}>
                <CircularProgressbar
                  value={reProfileProgress}
                  strokeWidth="18"
                  text={`${reProfileProgress}%`}
                  circleRatio={0.75}
                  strokeLinecap="butt"
                  styles={buildStyles({
                    rotation: 1 / 2 + 1 / 8,
                  })}
                ></CircularProgressbar>
              </div>
              <center>Your Overall Progress</center>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={6} sm={3} md={2}>
          <Card className={classes.dashCard}>
            <CardBody>
              <div
                style={{ width: 75, height: 75, fontSize: "48px" }}
                className={classes.center}
              >
                <Avatar className={classes.avatar}>
                  <AssignmentIcon
                    style={{ color: "#85C285" }}
                    fontSize="inherit"
                  />
                </Avatar>
              </div>
              <center>Your Tasks</center>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={6} sm={3} md={2}>
          <Card className={classes.dashCard}>
            <CardBody>
              <div
                style={{ width: 75, height: 75, fontSize: "48px" }}
                className={classes.center}
              >
                <Avatar className={classes.avatar}>
                  <DescriptionIcon
                    style={{ color: "#85C285" }}
                    fontSize="inherit"
                  />
                </Avatar>
              </div>
              <center>Your Documents</center>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={6} sm={3} md={2}>
          <Card className={classes.dashCard}>
            <CardBody>
              <div
                style={{ width: 75, height: 75, fontSize: "48px" }}
                className={classes.center}
              >
                <Avatar className={classes.avatar}>
                  <StoreIcon style={{ color: "#85C285" }} fontSize="inherit" />
                </Avatar>
              </div>
              <center>Your Real-Estate Profile</center>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
