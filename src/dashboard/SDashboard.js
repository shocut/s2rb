import React from "react";
import { useLocation } from "react-router";
import PropTypes from "prop-types";

import { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import Header from "../common/components/Header.js";
import HeaderLinks from "../common/components/HeaderLinks.js";
import { DataStore } from "aws-amplify";

import { SellerRealEstateProfile, RealEstateStatus } from "../models";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Parallax from "../common/components/Parallax.js";
import GridContainer from "../common/components/GridContainer.js";
import GridItem from "../common/components/GridItem.js";
import NavPills from "../common/components/NavPills.js";
import Card from "../common/components/Card.js";
import CardBody from "../common/components/CardBody.js";
import Button from "../common/components/Button.js";
import S3FileHandler from "../common/components/S3FileHandler.js";
import StoreIcon from "@material-ui/icons/Store";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import AttachFile from "@material-ui/icons/AttachFile";
import styles from "./dashboardStyle.js";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

import { styled } from "@mui/material/styles";
import CameraEnhanceOutlinedIcon from "@mui/icons-material/CameraEnhanceOutlined";
import Check from "@mui/icons-material/Check";
import MapsHomeWorkOutlinedIcon from "@mui/icons-material/MapsHomeWorkOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import AttributionOutlinedIcon from "@mui/icons-material/AttributionOutlined";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

import "react-circular-progressbar/dist/styles.css";
import "./custom.css";

const progressSteps = [
  {
    label: "1. Sign-up",
  },
  {
    label: "2. Create Profile",
  },
  {
    label: "3. Upload Photos",
  },
  {
    label: "4. S2RB Review",
  },
  {
    label: "5. Connect Agent",
  },
];

/*  stepper code  */

const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
  display: "flex",
  height: 22,
  alignItems: "center",
  ...(ownerState.active && {
    color: "#784af4",
  }),
  "& .QontoStepIcon-completedIcon": {
    color: "#784af4",
    zIndex: 1,
    fontSize: 18,
  },
  "& .QontoStepIcon-circle": {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
};

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 40,
  marginTop: "-5px",
  height: 40,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient( 136deg, #ffe600 0%, #ffb300 50%, #ffe600 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient( 136deg, #85c285 0%, #4b6e4b 50%, #85c285 100%)",
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;
  const icons = {
    1: <PersonAddOutlinedIcon />,
    2: <MapsHomeWorkOutlinedIcon />,
    3: <CameraEnhanceOutlinedIcon />,
    4: <FactCheckOutlinedIcon />,
    5: <AttributionOutlinedIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

/* stepper end  */

const useStyles = makeStyles(styles);

/* eslint-disable */
export default function SDashboard(props) {
  const [currentUser, setCurrentUser] = useState(
    localStorage.getItem("currentUser")
  );
  const [s2rb_re_profile_id, set_s2rb_re_profile_id] = useState(
    localStorage.getItem("s2rb_re_profile_id")
  );

  localStorage.setItem("s2rb_re_profile_progress", 20);
  const [reProfileProgress, setREProfileProgress] = useState(
    localStorage.getItem("s2rb_re_profile_progress")
  );

  const [reProfile, setProfile] = useState({});
  const [streetAddress, setStreetAddress] = useState({});
  const [attachments, setAttachments] = useState([]);
  const [confirmDone, setConfirmDone] = useState(false);
  const [currentREStatus, setCurrentREStatus] = useState("");

  //default active tab - this is not ideal TODO: need to optimize flow when dashboard is already loaded!
  /* eslint-disable */
  var tabRef = 0;
  var location = useLocation();
  var tabRefPath = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );
  if (tabRefPath) {
    //if (tabRefPath == "r") tabRef = 1; -- some potential for async errors
    if (tabRefPath == "d") tabRef = 2;
  }
  const [activeTab, setActiveTab] = useState(tabRef);

  const classes = useStyles();
  const dashboardRoutes = [];

  const onLogout = async () => {
    console.log("in log out - clearing localstorage");
    localStorage.clear();
    await Auth.signOut();
    checkLoginState();
  };

  const checkLoginState = async () => {
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      if (currentUser) {
        setCurrentUser(currentUser);
      } else {
        localStorage.clear();
        setCurrentUser(null);
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
            p.sellerReference("eq", userObj.username)
          ),
          currentUser
        );
      }
    };
    loadREProfile();
  }, [currentREStatus]);

  const setAndSaveAttachments = async (newAttachments) => {
    console.log("in setAndSaveAttachments");
    setAttachments(newAttachments);
    localStorage.setItem("s2rb_attachments", JSON.stringify(newAttachments));
    saveToDataStore();
  };

  const saveToDataStore = async () => {
    console.log("in saveToDataStore");
    try {
      var attchJson = localStorage.getItem("s2rb_attachments");
      var attchObj = JSON.parse(attchJson);
      localStorage.removeItem("s2rb_attachments");

      if (reProfile) {
        saveREProfileAttachments(
          await DataStore.query(SellerRealEstateProfile, reProfile.id),
          attchObj
        );
        if (reProfileProgress < 60) {
          setREProfileProgress(60); //only update if it was an earlier state
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  /* eslint-disable */
  const showDocumentTab = () => {
    setActiveTab(2);
  };

  function saveREProfileAttachments(originalREObj, newAttachments) {
    console.log("in saveREProfileAttachments: " + newAttachments);
    if (originalREObj) {
      //code for updating existing record

      DataStore.save(
        SellerRealEstateProfile.copyOf(originalREObj, (updated) => {
          updated.attachments = newAttachments;
          if (originalREObj.status == RealEstateStatus.NEW) {
            //don't overwrite other statuses!!!
            updated.status = RealEstateStatus.DOCS_UPLOADED;
            setCurrentREStatus(RealEstateStatus.DOCS_UPLOADED);
          }
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
      if (reProfile.status == RealEstateStatus.NEW) {
        setREProfileProgress(40);
      } else if (
        reProfile.status == RealEstateStatus.DOCS_UPLOADED ||
        reProfile.status == RealEstateStatus.DOCS_IN_REVIEW
      ) {
        setREProfileProgress(60);
      } else {
        setREProfileProgress(100);
      }

      setProfile(reProfile);
      if (!reProfile.attachments) {
        setAttachments([]);
      } else {
        setAttachments(reProfile.attachments);
      }

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

  const showConfirmDone = () => {
    setConfirmDone(true);
  };

  const closeDialog = () => {
    setConfirmDone(false);
  };

  const confirmMoveForward = () => {
    setConfirmDone(false);
    updateREProfileStatus(RealEstateStatus.DOCS_IN_REVIEW);
  };

  async function updateREProfileStatus(nextStatus) {
    try {
      saveREProfileStatus(
        await DataStore.query(SellerRealEstateProfile, s2rb_re_profile_id),
        nextStatus
      );
    } catch (e) {
      console.log(e);
    }
  }

  function saveREProfileStatus(originalREObj, nextStatus) {
    if (originalREObj) {
      DataStore.save(
        SellerRealEstateProfile.copyOf(originalREObj, (updated) => {
          if (nextStatus === RealEstateStatus.DOCS_IN_REVIEW) {
            if (originalREObj.status === RealEstateStatus.DOCS_UPLOADED) {
              updated.status = RealEstateStatus.DOCS_IN_REVIEW;
            }
          }
        })
      );
      setCurrentREStatus(nextStatus);
    }
  }

  return (
    <div>
      <Header
        color="white"
        routes={dashboardRoutes}
        brand="Sell To Rent Back"
        rightLinks={<HeaderLinks onLogout={onLogout} />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "dark",
        }}
      />
      <Parallax smallheader filter />

      {!currentUser && (
        <GridContainer justify="center" className={classes.main}>
          <GridItem xs={12} sm={12} md={9} lg={7}>
            <br></br>
          </GridItem>
          <GridItem xs={12} sm={12} md={9} lg={7}>
            <h4>
              <center>
                Please{" "}
                <a href="/signin?ref=/app/sdashboard" target="_self">
                  <b>sign-in</b>
                </a>{" "}
                to your S2RB account to view your dashboard. <br />
                If you have not yet registered, please{" "}
                <a href="/signup?ref=/app/sdashboard" target="_self">
                  <b>sign-up</b>
                </a>{" "}
                now for a free no obligation account.
              </center>
            </h4>
          </GridItem>
        </GridContainer>
      )}
      {currentUser && (
        <GridContainer justify="center" className={classes.main}>
          <GridItem xs={12} sm={12} md={11} lg={10}>
            <NavPills
              color="success"
              active={activeTab}
              tabs={[
                {
                  tabButton: "Progress",
                  tabIcon: DonutLargeIcon,
                  tabContent: (
                    <div>
                      <Card className={classes.dashCard}>
                        <CardBody>
                          <GridContainer>
                            <GridItem xs={12} sm={12} md={12} lg={12}>
                              <Stepper
                                activeStep={reProfileProgress / 20}
                                alternativeLabel
                                className={classes.timeLineCtr}
                              >
                                {progressSteps.map((step, index) => (
                                  <Step key={step.label}>
                                    <StepLabel
                                      StepIconComponent={ColorlibStepIcon}
                                    >
                                      {step.label}
                                    </StepLabel>
                                  </Step>
                                ))}
                              </Stepper>
                            </GridItem>

                            {!s2rb_re_profile_id && (
                              <GridItem xs={12} sm={12} md={12} lg={12}>
                                <div>
                                  <h4 className={classes.subtitle}>
                                    Thank you for signing-up!
                                  </h4>
                                  <h5>
                                    {" "}
                                    Please create your{" "}
                                    <a href="/app/reprofile" target="_self">
                                      <b>real-estate profile </b>
                                    </a>
                                    next to move forward.
                                  </h5>
                                  <h5>
                                    Completing that information does NOT
                                    initiate any application process or credit
                                    checks. It simply helps you begin the
                                    process to consult with a licensed real
                                    estate agent and match investors who may be
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
                                  <h5 onClick={showDocumentTab}>
                                    In order to start the investor matching
                                    process we need you to upload property
                                    photos. Plase navigate to the{" "}
                                    <a href="/app/sdashboard/d" target="_self">
                                      Photos
                                    </a>{" "}
                                    tab to upload house photos. All photos and
                                    documents are uploaded, transimitted and
                                    stored in secure encrypted format.
                                  </h5>

                                  {reProfile.status ===
                                    RealEstateStatus.DOCS_UPLOADED && (
                                    <p>
                                      <a href="#" onClick={showConfirmDone}>
                                        <b>
                                          Done with estate profile and uploading
                                          photos{" "}
                                          <Button
                                            round={true}
                                            onClick={showConfirmDone}
                                            color="primary"
                                            justIcon={true}
                                            size="sm"
                                          >
                                            ?
                                          </Button>
                                        </b>
                                      </a>
                                    </p>
                                  )}

                                  {reProfile.status ===
                                    RealEstateStatus.DOCS_IN_REVIEW && (
                                    <h5 className={classes.statusNote}>
                                      <i>
                                        <b>Note:</b> S2RB is in the process of
                                        reviewing your real estate profile, you
                                        may continue to add photos and documents
                                        during this time.
                                      </i>
                                    </h5>
                                  )}
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
                                    Thank you for signing-up!
                                  </h4>
                                  <h5>
                                    {" "}
                                    Please create your{" "}
                                    <a href="/app/reprofile" target="_self">
                                      <b>real-estate profile </b>
                                    </a>
                                    next to move forward.
                                  </h5>
                                  <h5>
                                    Completing that information does NOT
                                    initiate any application process or credit
                                    checks. It simply helps you begin the
                                    process to consult with a licensed real
                                    estate agent and match investors who may be
                                    interested in your property.
                                  </h5>
                                </div>{" "}
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
                                {(reProfile.status === RealEstateStatus.NEW ||
                                  reProfile.status ===
                                    RealEstateStatus.DOCS_UPLOADED) && (
                                  <GridItem xs={12}>
                                    <div>
                                      <br />
                                      <Button
                                        color="success"
                                        href="/app/reprofile"
                                        target="_self"
                                      >
                                        Edit
                                      </Button>
                                    </div>
                                  </GridItem>
                                )}
                                {reProfile.status != RealEstateStatus.NEW &&
                                  reProfile.status !=
                                    RealEstateStatus.DOCS_UPLOADED && (
                                    <GridItem xs={12}>
                                      <p>
                                        <br />
                                        <b>Please Note:&nbsp;</b> The status of
                                        your real estate profile is "
                                        {reProfile.status}". If you need to make
                                        any changes to your submission please
                                        write to support@s2rb.com with details.
                                      </p>
                                    </GridItem>
                                  )}
                              </GridContainer>
                            </CardBody>
                          </Card>
                        </div>
                      )}
                    </div>
                  ),
                },
                {
                  tabButton: "Photos",
                  tabIcon: CameraEnhanceOutlinedIcon,
                  tabContent: (
                    <span>
                      <Card className={classes.dashCard}>
                        <CardBody>
                          <GridContainer>
                            {!s2rb_re_profile_id && (
                              <GridItem xs={12} sm={12} md={12} lg={12}>
                                <div>
                                  <h4 className={classes.subtitle}>
                                    Thank you for signing-up!
                                  </h4>
                                  <h5>
                                    {" "}
                                    Please create your{" "}
                                    <a href="/app/reprofile" target="_self">
                                      <b>real-estate profile </b>
                                    </a>
                                    next to move forward.
                                  </h5>
                                  <h5>
                                    Completing that information does NOT
                                    initiate any application process or credit
                                    checks. It simply helps you begin the
                                    process to consult with a licensed real
                                    estate agent and match investors who may be
                                    interested in your property.
                                  </h5>
                                </div>
                              </GridItem>
                            )}
                            {s2rb_re_profile_id && (
                              <GridItem xs={12} sm={12} md={12} lg={12}>
                                <div>
                                  <h4 className={classes.subtitle}>
                                    Please upload your house photos.
                                  </h4>
                                  <h5>
                                    All photos and documents are uploaded,
                                    transimitted and stored in secure encrypted
                                    format. Only house photos are required to
                                    move forward but uploading documents such as
                                    recent mortgage statement help expedite the
                                    review.
                                  </h5>
                                  <h5>
                                    Once your profile is complete you can
                                    initiate the next step to begin data
                                    verification. Then S2RB will introduce a
                                    licensed real estate agent to help you with
                                    matching investors who may be interested in
                                    your property.
                                  </h5>

                                  {reProfile.status ===
                                    RealEstateStatus.DOCS_UPLOADED && (
                                    <p>
                                      <a href="#" onClick={showConfirmDone}>
                                        <b>
                                          Done with estate profile and uploading
                                          photos{" "}
                                          <Button
                                            round={true}
                                            onClick={showConfirmDone}
                                            color="primary"
                                            justIcon={true}
                                            size="sm"
                                          >
                                            ?
                                          </Button>
                                        </b>
                                      </a>
                                    </p>
                                  )}

                                  {reProfile.status ===
                                    RealEstateStatus.DOCS_IN_REVIEW && (
                                    <h5 className={classes.statusNote}>
                                      <i>
                                        <b>Note:</b> S2RB is in the process of
                                        reviewing your real estate profile, you
                                        may continue to add photos and documents
                                        during this time.
                                      </i>
                                    </h5>
                                  )}
                                  <div>
                                    <S3FileHandler
                                      attachments={attachments}
                                      allowDelete={
                                        reProfile.status ===
                                          RealEstateStatus.NEW ||
                                        reProfile.status ===
                                          RealEstateStatus.DOCS_UPLOADED
                                      }
                                      setAndSaveAttachments={
                                        setAndSaveAttachments
                                      }
                                      formControlProps={{
                                        fullWidth: true,
                                      }}
                                      inputProps={{
                                        placeholder: "Select a file to upload.",
                                      }}
                                      maxFileSize={10000000}
                                      endButton={{
                                        buttonProps: {
                                          round: true,
                                          color: "success",
                                          justIcon: true,
                                        },
                                        icon: <AttachFile />,
                                      }}
                                    />
                                  </div>
                                </div>
                              </GridItem>
                            )}
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

      <Dialog
        classes={{
          root: classes.center,
          paper: classes.modal,
        }}
        open={confirmDone}
        keepMounted
        TransitionComponent={Transition}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          id="alert-dialog-slide-title"
          className={classes.modalHeader}
        >
          <div className={classes.modalTitle}>
            Done with profile and photos?
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Please confirm if you want us to begin reviewing the information.
            You can continue to add photos and documents during the review
            process.
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.modalFooter}>
          <Button color="success" onClick={confirmMoveForward}>
            Begin Review
          </Button>
          <Button color="info" onClick={closeDialog}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
