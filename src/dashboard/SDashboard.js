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
import CustomFileInput from "../common/components/CustomFileInput.js";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./custom.css";

import DescriptionIcon from "@material-ui/icons/Description";
import StoreIcon from "@material-ui/icons/Store";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import AttachFile from "@material-ui/icons/AttachFile";
import styles from "./dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function SDashboard(props) {
  console.log(props);
  const [currentUser, setCurrentUser] = useState(
    localStorage.getItem("currentUser")
  );
  const [s2rb_re_profile_id, set_s2rb_re_profile_id] = useState(
    localStorage.getItem("s2rb_re_profile_id")
  );

  localStorage.setItem("s2rb_re_profile_progress", 30);
  const [reProfileProgress, setREProfileProgress] = useState(
    localStorage.getItem("s2rb_re_profile_progress")
  );

  const [reProfile, setProfile] = useState({});
  const [streetAddress, setStreetAddress] = useState({});
  const [attachments, setAttachments] = useState([]);

  const classes = useStyles();
  const dashboardRoutes = [];

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

  const saveToDataStore = async () => {
    console.log("in saveToDataStore");
    if (reProfile) {
      saveREProfileAttachments(
        await DataStore.query(SellerRealEstateProfile, reProfile.id)
      );
    }
  };

  function saveREProfileAttachments(originalREObj) {
    console.log("in saveREProfileAttachments");

    if (originalREObj) {
      //code for updating existing record
      DataStore.save(
        SellerRealEstateProfile.copyOf(originalREObj, (updated) => {
          updated.attachments = attachments;
        })
      );
    }
  }

  const setREProfile = (reProfileList, currentUser) => {
    console.log("reProfileList.length: " + reProfileList.length);
    if (reProfileList && reProfileList.length > 0) {
      var reProfile = reProfileList[0];
      localStorage.setItem("s2rb_re_profile_id", reProfile.id);
      set_s2rb_re_profile_id(reProfile.id);
      setREProfileProgress(60);
      setProfile(reProfile);
      if (!reProfile.attachments) {
        setAttachments([]);
      } else {
        setAttachments(reProfile.attachments);
      }

      console.log("attachments " + attachments);
      setStreetAddress(
        reProfile.address ? reProfile.address.formattedAddress : ""
      );
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
        <h4>
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
        </h4>
      )}

      {currentUser && (
        <GridContainer justify="center" className={classes.main}>
          <GridItem xs={12} sm={12} md={9} lg={7}>
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
                            <GridItem xs={12} sm={2} md={2} lg={2}>
                              <center>
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
                                  Progress
                                </div>{" "}
                              </center>
                            </GridItem>
                            {!s2rb_re_profile_id && (
                              <GridItem xs={12} sm={10} md={10} lg={10}>
                                <div>
                                  <h4 className={classes.subtitle}>
                                    Thank you for signing-up and creating a user
                                    profile.
                                  </h4>
                                  <h5>
                                    Please complete your&nbsp;
                                    <a href="/reprofile" target="_self">
                                      <b>real-estate profile</b>
                                    </a>
                                    &nbsp; to unlock the next stage.
                                  </h5>
                                  <h5>
                                    Completing that information does NOT
                                    initiate any application process or credit
                                    checks. It simply helps you begin the
                                    process for matching investors who may be
                                    interested in your property.
                                  </h5>
                                </div>
                              </GridItem>
                            )}
                            {s2rb_re_profile_id && (
                              <GridItem xs={10} sm={10} md={10} lg={10}>
                                <div>
                                  <h4 className={classes.subtitle}>
                                    Thank you for updating your real estate
                                    profile.
                                  </h4>
                                  <h5>
                                    Please upload documents showing mortgage and
                                    home-ownership details to unlock the next
                                    stage.
                                  </h5>
                                  <h5>
                                    All documents are uploaded, transimitted and
                                    stored in encrypted format. The documents
                                    are used to verify and validate
                                    home-ownership and mortgage information. We
                                    do not share these with any other users or
                                    companies including potential investors.
                                  </h5>
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
                                  <h4 className={classes.subtitle}>
                                    Thank you for signing-up and creating a user
                                    profile.
                                  </h4>
                                  <h5>
                                    Please complete your&nbsp;
                                    <a href="/reprofile" target="_self">
                                      <b>real-estate profile</b>
                                    </a>
                                    &nbsp; to unlock the next stage.
                                  </h5>
                                  <h5>
                                    Completing that information does NOT
                                    initiate any application process or credit
                                    checks. It simply helps you begin the
                                    process for matching investors who may be
                                    interested in your property.
                                  </h5>
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
                              <h4 className={classes.subtitle}>
                                Thank you for updating your real estate profile.
                              </h4>
                              <GridContainer>
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
                                  <b>Bedrooms</b>
                                </GridItem>
                                <GridItem xs={9}>{reProfile.bedrooms}</GridItem>
                                <GridItem xs={3}>
                                  <b>Bathrooms</b>
                                </GridItem>
                                <GridItem xs={9}>
                                  {reProfile.bathrooms}
                                </GridItem>
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
                                <h4 className={classes.subtitle}>
                                  Thank you for updating your real estate
                                  profile.
                                </h4>
                                <h5>
                                  To unlock the next stage, please upload
                                  documents showing mortgage and home-ownership
                                  details.
                                </h5>
                                <h5>
                                  All documents are uploaded, transimitted and
                                  stored in encrypted format. The documents are
                                  used to verify and validate home-ownership and
                                  mortgage information. We do not share these
                                  with any other users or companies including
                                  potential investors.
                                </h5>

                                <div>
                                  <CustomFileInput
                                    attachments={attachments}
                                    setAttachments={setAttachments}
                                    saveToDataStore={saveToDataStore}
                                    formControlProps={{
                                      fullWidth: true,
                                    }}
                                    inputProps={{
                                      placeholder: "Select a file to upload.",
                                    }}
                                    endButton={{
                                      buttonProps: {
                                        round: true,
                                        color: "success",
                                        justIcon: true,
                                        fileButton: true,
                                      },
                                      icon: <AttachFile />,
                                    }}
                                  />
                                </div>
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
          </GridItem>
        </GridContainer>
      )}
    </div>
  );
}
