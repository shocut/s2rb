import React from "react";

import { useEffect, useState } from "react";
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
import NavPills from "../common/components/NavPills.js";
import Card from "../common/components/Card.js";
import CardBody from "../common/components/CardBody.js";
import Button from "../common/components/Button.js";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./custom.css";

import DescriptionIcon from "@material-ui/icons/Description";
import StoreIcon from "@material-ui/icons/Store";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";

import styles from "./dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function SDashboard() {
  const classes = useStyles();
  const dashboardRoutes = [];
  localStorage.setItem("s2rb_re_profile_progress", 30);

  const [currentUser, setCurrentUser] = useState(
    localStorage.getItem("currentUser")
  );
  const [s2rb_re_profile_id, set_s2rb_re_profile_id] = useState(
    localStorage.getItem("s2rb_re_profile_id")
  );

  const [reProfileProgress, setREProfileProgress] = useState(
    localStorage.getItem("s2rb_re_profile_progress")
  );

  const [reProfile, setProfile] = useState({});
  const [streetAddress, setStreetAddress] = useState({});

  const onLogout = async () => {
    await Auth.signOut();
    localStorage.clear();
    checkLoginState();
  };

  const checkLoginState = async () => {
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      if (currentUser) {
        setCurrentUser(currentUser);
      }
    } catch (e) {
      setCurrentUser(null);
    }
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
          ),
          currentUser
        );
      }
    };
    loadREProfile();
  }, []);

  const setREProfile = (reProfileList, currentUser) => {
    console.log("reProfileList.length: " + reProfileList.length);
    if (reProfileList && reProfileList.length > 0) {
      var reProfile = reProfileList[0];
      localStorage.setItem("s2rb_re_profile_id", reProfile.id);
      set_s2rb_re_profile_id(reProfile.id);
      setREProfileProgress(60);
      setProfile(reProfile);
      setStreetAddress(reProfile.address.formattedAddress);
    } else {
      console.log("No existing RE profile");
      localStorage.clear();
      localStorage.setItem("currentUser", currentUser); //this needs to stay!
      set_s2rb_re_profile_id(null);
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
      />
      <Parallax
        smallheader
        filter
        image={require("../common/img/header-bg.jpg").default}
      />

      {!currentUser && (
        <h3>
          <center>
            Please{" "}
            <a href="/signup?ref=sdashboard" target="_self">
              <b>sign-in</b>
            </a>{" "}
            to your S2RB account to view your dashboard. <br />
            If you have not yet resitered, please{" "}
            <a href="/signup?ref=reprofile" target="_self">
              <b>sign-up</b>
            </a>{" "}
            now for a free no obligation account.
          </center>
        </h3>
      )}
      {currentUser && (
        <GridContainer justify="center" className={classes.main}>
          <GridItem xs={12} sm={12} md={8} lg={6}>
            <div>
              <NavPills
                color="success"
                tabs={[
                  {
                    tabButton: "Progress",
                    tabIcon: DonutLargeIcon,
                    tabContent: (
                      <div>
                        <Card className={classes.dashCard}>
                          <CardBody>
                            <GridContainer>
                              <GridItem xs={2} sm={2} md={2} lg={2}>
                                <div style={{ width: 100, height: 100 }}>
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
                                  <center>Progress</center>
                                </div>
                              </GridItem>

                              {!s2rb_re_profile_id && (
                                <GridItem xs={10} sm={10} md={10} lg={10}>
                                  <div>
                                    <h4>
                                      Thank you for signing-up and creating a
                                      user profile.
                                    </h4>
                                    <p>
                                      To unlock the next stage, please complete
                                      your&nbsp;
                                      <a href="/reprofile" target="_self">
                                        <b>real-estate profile</b>
                                      </a>
                                      .
                                    </p>
                                    <p>
                                      Completing that information does NOT
                                      initiate any application process or credit
                                      checks. It simply helps you begin the
                                      process for matching investors who may be
                                      interested in your property.
                                    </p>
                                  </div>
                                </GridItem>
                              )}
                              {s2rb_re_profile_id && (
                                <GridItem xs={10} sm={10} md={10} lg={10}>
                                  <div>
                                    <h4>
                                      Thank you for updating your real estate
                                      profile.
                                    </h4>
                                    <p>
                                      To unlock the next stage, please upload
                                      documents showing mortgage and
                                      home-ownership details.
                                    </p>
                                    <p>
                                      All documents are uploaded, transimitted
                                      and stored in encrypted format. The
                                      documents are used to verify and validate
                                      home-ownership and mortgage information.
                                      We do not share these with any other users
                                      or companies including potential
                                      investors.
                                    </p>
                                  </div>
                                </GridItem>
                              )}
                            </GridContainer>
                          </CardBody>
                        </Card>
                      </div>
                    ),
                  },
                  {
                    tabButton: "Profile",
                    tabIcon: StoreIcon,
                    tabContent: (
                      <div>
                        {!s2rb_re_profile_id && (
                          <Card className={classes.dashCard}>
                            <CardBody>
                              <GridContainer>
                                <GridItem xs={12} sm={12} md={12} lg={12}>
                                  <div>
                                    <h4>
                                      Thank you for signing-up and creating a
                                      user profile.
                                    </h4>
                                    <p>
                                      To unlock the next stage, please complete
                                      your&nbsp;
                                      <a href="/reprofile" target="_self">
                                        <b>real-estate profile</b>
                                      </a>
                                      .
                                    </p>
                                    <p>
                                      Completing that information does NOT
                                      initiate any application process or credit
                                      checks. It simply helps you begin the
                                      process for matching investors who may be
                                      interested in your property.
                                    </p>
                                  </div>
                                </GridItem>
                              </GridContainer>
                            </CardBody>
                          </Card>
                        )}

                        {s2rb_re_profile_id && (
                          <div>
                            <Card className={classes.dashCard}>
                              <CardBody>
                                <h4>
                                  Thank you for updating your real estate
                                  profile.
                                </h4>
                                <GridContainer>
                                  <GridItem xs={3}>
                                    <b>Search Stage</b>
                                  </GridItem>
                                  <GridItem xs={9}>
                                    {reProfile.searchStage}
                                  </GridItem>
                                  <GridItem xs={3}>
                                    <b>House Type</b>
                                  </GridItem>
                                  <GridItem xs={9}>
                                    {reProfile.houseType}
                                  </GridItem>
                                  <GridItem xs={3}>
                                    <b>Primary Home</b>
                                  </GridItem>
                                  <GridItem xs={9}>
                                    {reProfile.primaryHome}
                                  </GridItem>
                                  <GridItem xs={3}>
                                    <b>Home Address</b>
                                  </GridItem>
                                  <GridItem xs={9}>{streetAddress}</GridItem>
                                  <GridItem xs={3}>
                                    <b>Rent-back Preference</b>
                                  </GridItem>
                                  <GridItem xs={9}>
                                    {reProfile.rentBackPeriod}
                                  </GridItem>
                                  <GridItem xs={12}>
                                    <div>
                                      <br />
                                      <Button
                                        color="success"
                                        href="/reprofile"
                                        target="_self"
                                      >
                                        Edit
                                      </Button>
                                    </div>
                                  </GridItem>
                                </GridContainer>
                              </CardBody>
                            </Card>
                          </div>
                        )}
                      </div>
                    ),
                  },
                  {
                    tabButton: "Documents",
                    tabIcon: DescriptionIcon,
                    tabContent: (
                      <span>
                        <Card className={classes.dashCard}>
                          <CardBody>
                            <GridContainer>
                              <GridItem xs={12} sm={12} md={12} lg={12}>
                                <div>
                                  <h4>
                                    Thank you for updating your real estate
                                    profile.
                                  </h4>
                                  <p>
                                    To unlock the next stage, please upload
                                    documents showing mortgage and
                                    home-ownership details.
                                  </p>
                                  <p>
                                    All documents are uploaded, transimitted and
                                    stored in encrypted format. The documents
                                    are used to verify and validate
                                    home-ownership and mortgage information. We
                                    do not share these with any other users or
                                    companies including potential investors.
                                  </p>
                                </div>
                              </GridItem>
                            </GridContainer>
                          </CardBody>
                        </Card>
                      </span>
                    ),
                  },
                ]}
              />
            </div>
          </GridItem>
        </GridContainer>
      )}
    </div>
  );
}
