/* eslint-disable */
import React from "react";
import ReactDOM from "react-dom";

import { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";

import { Storage } from "aws-amplify";
import { Auth } from "aws-amplify";

// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { DataStore } from "aws-amplify";
import {
  SellerRealEstateProfile,
  RealEstateStatus,
  Referral,
  FeeType,
  ReferralType,
  ClientReason,
} from "../models";

// @material-ui/icons
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
// core components
import Header from "../common/components/Header.js";
import HeaderLinks from "../common/components/HeaderLinks.js";
import Parallax from "../common/components/Parallax.js";
import Table from "../common/components/Table.js";
import Button from "../common/components/Button.js";
import Card from "../common/components/Card.js";
import CardBody from "../common/components/CardBody.js";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";
import GridContainer from "../common/components/GridContainer.js";
import GridItem from "../common/components/GridItem.js";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";

import SnackbarContent from "../common/components/SnackbarContent.js";
import listingStyle from "./listingStyle.js";

import ReferralPDF from "../referral/ReferralPDF";
import referralTemplateData from "../referral/ReferralTemplateData.js";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";

const useStyles = makeStyles(listingStyle);
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default function HomeList() {
  const thisRef = useRef(null); // ref => { current: null }

  const classes = useStyles();
  const history = useHistory();
  const dashboardRoutes = [];
  const [homeRows, setHomeRows] = useState([]);
  const [currentUser, setCurrentUser] = useState(
    localStorage.getItem("currentUser")
  );
  const [showViewDocuments, setShowViewDocuments] = useState(false);
  // eslint-disable-next-line
  const [reProfileAttchMap, setREProfileAttchMap] = useState(new Map());
  const [currentAttachments, setCurrentAttachments] = useState([]);
  const [currentSellerRef, setCurrentSellerRef] = useState("");
  const [currentProfileId, setCurrentProfileId] = useState("");
  const [currentProfileState, setCurrentProfileState] = useState("");
  const [currentDocURL, setCurrentDocURL] = useState("");
  const [confirmModal, setConfirmModal] = useState(false);
  const [refSaved, setRefSaved] = useState(false);
  const [clientReason, setClientReason] = useState("");
  const [referralNote, setReferralNote] = useState("");
  const [listingPriceEstimate, setListingPriceEstimate] = useState("");
  const [loadingData, setLoadingData] = useState(false);
  const [loadingCounter, setLoadingCounter] = useState(0);

  const onLogout = async () => {
    localStorage.clear();
    await Auth.signOut();
    checkLoginState();
  };

  const checkLoginState = async () => {
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      if (currentUser) {
        setCurrentUser(currentUser);
        const groups =
          currentUser.signInUserSession.accessToken.payload["cognito:groups"];
        if (
          !groups ||
          (!groups.includes("admin") && !groups.includes("operator"))
        ) {
          var nextPage = "/app/sdashboard";
          history.push(nextPage);
        }
      }
    } catch (e) {
      localStorage.removeItem("currentUser");
      setCurrentUser(null);
    }
  };
  useEffect(() => {
    checkLoginState();
    const loadREProfiles = async () => {
      try {
        var reProfiles = await DataStore.query(SellerRealEstateProfile, (p) =>
          p.or((p) =>
            p
              .status("eq", RealEstateStatus.DOCS_UPLOADED)
              .status("eq", RealEstateStatus.DOCS_IN_REVIEW)
              .status("eq", RealEstateStatus.DOCS_REVIEWED)
              .status("eq", RealEstateStatus.REFERRAL_GENERATED)
          )
        );
        var tableData = genTableData(reProfiles);
        setHomeRows(tableData);
        setHomeThumbnails(reProfiles);
      } catch (e) {
        console.log(e);
      }
    };
    loadREProfiles();
  }, []);

  function genTableData(reProfiles) {
    var tableData = [];
    reProfiles.forEach((element, index) => {
      tableData.push(homeListRow(index, element));
      reProfileAttchMap.set(element.sellerReference, element.attachments);
    });
    return tableData;
  }

  const closeDialog = () => {
    setShowViewDocuments(false);
    setConfirmModal(false);
  };

  const reviewDocs = (evt) => {
    var sellerReference = evt.currentTarget.getAttribute("seller_reference");
    var reProfileId = evt.currentTarget.getAttribute("re_profile_id");
    var attchArray = reProfileAttchMap.get(sellerReference);
    setCurrentAttachments(attchArray);
    setCurrentSellerRef(sellerReference);
    setCurrentProfileId(reProfileId);
    setShowViewDocuments(true);
    addAttachmentLinks(sellerReference, attchArray);
  };

  const onDocClick = (evt) => {
    var fileKey = evt.currentTarget.getAttribute("file_key");
    var sellerReference = evt.currentTarget.getAttribute("seller_reference");
    getDocumentURL(sellerReference, fileKey);
  };

  async function getDocumentURL(sellerReference, fileKey) {
    try {
      Storage.get(fileKey, {
        level: "protected",
        identityId: sellerReference,
      }).then((result) => {
        setCurrentDocURL(result);
      });
    } catch (e) {
      console.log(e);
    }
  }

  const addAttachmentLinks = (sellerReference, attachments) => {
    var docMap = new Map();
    if (!sellerReference || !attachments) {
      sellerReference = currentSellerRef;
      attachments = currentAttachments;
    }
    //initialize document categories
    docMap.set("mortgage_stmt", []);
    docMap.set("title_proof", []);
    docMap.set("identity_proof", []);
    docMap.set("home_photo", []);

    if (attachments && attachments.length > 0) {
      attachments.forEach((attch) => {
        //console.log("Current index: ", index, result);
        var attchNode = React.createElement(
          "p",
          {
            onClick: onDocClick,
            file_key: attch.fileKey,
            seller_reference: sellerReference,
            className: classes.docButton,
          },
          attch.name
        );
        var docArray = docMap.get(attch.category);
        if (docArray) docArray.push(attchNode);
      });

      for (let [key, arrayValue] of docMap) {
        var domEle = document.getElementById(key);
        if (domEle) {
          if (arrayValue && arrayValue.length > 0) {
            ReactDOM.render(arrayValue, domEle);
          } else {
            ReactDOM.render(React.createElement("p", {}, "N/A"), domEle);
          }
        } else {
          console.log("key not found", key);
        }
      }
    }
  };

  function homeListRow(index, item) {
    var listRowArray = [
      <div className={classes.imgContainer} key={1} id={item.id}>
        <HomeOutlinedIcon
          fontSize="inherit"
          color="inherit"
          className={classes.thumbNail}
        />
      </div>,
      <span key={1}>
        <div className={classes.tdNameAnchor}>{item.houseType}</div>
        <small className={classes.tdNameSmall}>
          {item.bedrooms} beds, {item.bathrooms} baths
          <br />
          {item.firstName} {item.lastName}
          <br />
          {item.address.formattedAddress}
          <br />
          Status: {item.status},{" "}
          {new Date(item.updatedAt).toLocaleString("en-US")}
        </small>
      </span>,
      <span key={1}>
        <small className={classes.tdNumberSmall}></small>
      </span>,
      // eslint-disable-next-line
      <Button
        size="sm"
        color="warning"
        seller_reference={item.sellerReference}
        re_profile_id={item.id}
        onClick={reviewDocs}
      >
        Review Documents
      </Button>,
    ];

    // eslint-disable-next-line
    if (item.status != RealEstateStatus.REFERRAL_GENERATED) {
      listRowArray.push(
        <Button
          size="sm"
          re_profile_id={item.id}
          re_profile_state={item.address.stateProvinceOrRegion}
          onClick={createReferralOnClick}
          color="success"
        >
          Initiate Referral
        </Button>
      );
    }
    // eslint-disable-next-line
    if (item.status == RealEstateStatus.REFERRAL_GENERATED) {
      listRowArray.push(
        <Button
          size="sm"
          re_profile_id={item.id}
          re_profile_state={item.address.stateProvinceOrRegion}
          onClick={downloadReferralPDF}
          color="primary"
        >
          Get Referral Form
        </Button>
      );
    }
    return listRowArray;
  }

  function setHomeThumbnails(reProfileArray) {
    //get the first home image to use as a thumbnail and then skip the rest
    //do this for all seller profiles which have attachments
    reProfileArray.forEach((element) => {
      if (element.attachments && element.attachments.length > 0) {
        element.attachments.some((attch) => {
          //console.log("attch.category: ", attch.category );
          if (attch.category == "home_photo") {
            //console.log(attch.fileKey);
            Storage.get("resized_" + attch.fileKey, {
              level: "protected",
              identityId: element.sellerReference,
            })
              .then((result) => {
                //console.log("Current index: ", index, result);
                var imgNode = React.createElement("img", {
                  src: result,
                  width: "200",
                });
                var domEle = document.getElementById(element.id);
                if (domEle) {
                  if (result) {
                    ReactDOM.render(imgNode, domEle);
                  }
                } else {
                  console.log("Seller ref not found", element.id);
                }
              })
              .catch((err) => console.log(err));
            return true; //exit the some loop after finding first home photo
          }
        });
      }
    });
    //forceUpdate(true);
  }

  async function updateREProfileStatusOnClick(evt) {
    var nextStatus = evt.currentTarget.getAttribute("next_status");
    updateREProfileStatus(nextStatus);
  }

  async function updateREProfileStatus(nextStatus) {
    try {
      saveREProfileStatus(
        await DataStore.query(SellerRealEstateProfile, currentProfileId),
        nextStatus
      );
    } catch (e) {
      console.log(e);
      setShowViewDocuments(false);
    }
  }

  function saveREProfileStatus(originalREObj, nextStatus) {
    setShowViewDocuments(false);
    if (originalREObj) {
      DataStore.save(
        SellerRealEstateProfile.copyOf(originalREObj, (updated) => {
          if (nextStatus === RealEstateStatus.DOCS_REVIEWED) {
            if (
              originalREObj.status === RealEstateStatus.DOCS_UPLOADED ||
              originalREObj.status === RealEstateStatus.DOCS_IN_REVIEW
            ) {
              updated.status = RealEstateStatus.DOCS_REVIEWED;
            }
          } else if (nextStatus === RealEstateStatus.REFERRAL_GENERATED) {
            if (originalREObj.status === RealEstateStatus.DOCS_REVIEWED) {
              updated.status = RealEstateStatus.REFERRAL_GENERATED;
            } else {
              console.log(
                "Cannot update referral status: current status",
                originalREObj.status
              );
            }
          }
        })
      );
    }
  }

  function generateUniqueReferralToken() {
    // Two chat state + 8 char timestamp based str + 1-2 char random component + an added zero in case the randome is just 1 char
    // can consider later if a shorter number will be better.
    var uniqueId =
      currentProfileState +
      Date.now().toString(36).toUpperCase() +
      Math.random().toString(36).substr(11).toUpperCase() +
      "0000";
    return uniqueId.substring(0, 12);
  }

  function getNewReferral(reProfileId) {
    var newToken = generateUniqueReferralToken();
    var numListingEst = listingPriceEstimate
      .replace("$", "")
      .replace(",", "")
      .replace(" ", "");

    var newRef = new Referral({
      feeBasis: "SELLING_SIDE",
      token: newToken,
      clientType: ReferralType.SELLER,
      listingPriceEstimate: parseFloat(numListingEst),
      clientReason: clientReason,
      feeType: FeeType.PERCENTAGE,
      feeValue: "",
      referralType: ReferralType.SELLER,
      referralNote: referralNote,
      sellerRealEstateProfileID: reProfileId,
    });

    console.log("newRef", newRef);
    return newRef;
  }

  const createReferralOnClick = (evt) => {
    var reProfileId = evt.currentTarget.getAttribute("re_profile_id");
    var reProfileState = evt.currentTarget.getAttribute("re_profile_state");

    setCurrentProfileId(reProfileId);
    setCurrentProfileState(reProfileState);

    setReferralNote("");
    setListingPriceEstimate("");

    setConfirmModal(true);
  };

  async function generatePDFDocument(documentData, fileName) {
    const blob = await pdf(<ReferralPDF referral={documentData} />).toBlob();
    //console.log(blob);
    saveAs(blob, fileName);
  }

  async function downloadReferralPDF(evt) {
    var reProfileId = evt.currentTarget.getAttribute("re_profile_id");
    try {
      //get the real estate profile and referral data from DB
      setLoadingData(true);
      DataStore.query(SellerRealEstateProfile, reProfileId).then(
        (reProfile) => {
          var realEstateProfile = reProfile;
          DataStore.query(Referral, (p) =>
            p.sellerRealEstateProfileID("eq", reProfileId)
          ).then((refDataArray) => {
            var referralData = null;
            if (refDataArray && refDataArray.length > 0) {
              referralData = refDataArray[0]; //for now take the first one!! Need to address multiple referrals if necessary in future...
            }
            setLoadingData(false);

            setTimeout(function () {
              try {
                if (realEstateProfile && referralData) {
                  var stateCode =
                    realEstateProfile.address.stateProvinceOrRegion;

                  var referralPDFTemplate = Object.assign(
                    referralTemplateData.get("Header"),
                    referralTemplateData.get(stateCode),
                    referralTemplateData.get("clientSection"),
                    referralTemplateData.get("agreementSection")
                  );

                  var strRefData = JSON.stringify(referralPDFTemplate);
                  var dateUpdated = new Date(referralData.updatedAt);
                  var dateStr = dateUpdated.toLocaleDateString();
                  var estPriceStr =
                    referralData.listingPriceEstimate.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                      maximumFractionDigits: 0,
                    });

                  var tokenMap = {
                    "{referral_num}": referralData.token,
                    "{updatedAt}": dateStr,
                    "{firstname}": reProfile.firstName,
                    "{lastName}": reProfile.lastName,
                    "{sellerPhone}": reProfile.sellerPhone,
                    "{streetAddress}": reProfile.address.streetAddress,
                    "{city}": reProfile.address.city,
                    "{stateProvinceOrRegion}": stateCode,
                    "{sellerEmail}": reProfile.sellerEmail,
                    "{rentBackPeriod}": reProfile.rentBackPeriod,
                    "{houseType}": reProfile.houseType,
                    "{bedrooms}": reProfile.bedrooms,
                    "{bathrooms}": reProfile.bathrooms,
                    "{listingPriceEstimate}": estPriceStr,
                    "{clientReason}": referralData.clientReason,
                    "{referralNote}": referralData.referralNote,
                  };
                  strRefData = replaceAll(strRefData, tokenMap);
                  var referralPDFData = JSON.parse(strRefData);

                  if (referralPDFData) {
                    //generate pdf blob
                    generatePDFDocument(
                      referralPDFData,
                      "S2RB_Referral_" + referralData.token + ".pdf"
                    );
                  } else {
                    alert(
                      "There was an error generating the referral data for PDF"
                    );
                  }
                }
              } catch (e) {
                console.log(e);
              }
            }, 1000);
          });
        }
      );
    } catch (e) {
      console.log(e);
    }
  }

  function replaceAll(str, mapObj) {
    var re = new RegExp(Object.keys(mapObj).join("|"), "gi");
    return str.replace(re, function (matched) {
      return mapObj[matched];
    });
  }

  const mergeRefDataWithTemplate = (reProfile, referralData) => (event) => {
    if (loadingData && loadingCounter < 5) {
      setLoadingCounter(loadingCounter + 1);
      setTimeout(mergeRefDataWithTemplate, 2000, reProfile, referralData);
      console.log(loadingCounter);
      return false;
    }
    setLoadingCounter(0);
    setLoadingData(false);

    try {
      if (realEstateProfile && referralData) {
        var stateCode = realEstateProfile.address.stateProvinceOrRegion;

        var referralPDFTemplate = Object.assign(
          referralTemplateData.get(stateCode),
          referralTemplateData.get("clientSection"),
          referralTemplateData.get("agreementSection")
        );

        var strRefData = JSON.stringify(referralPDFTemplate);

        strRefData.replace("{referral_num}", referralData.token);
        strRefData.replace(
          "{updatedAt}",
          Date(item.updatedAt).toLocaleDateString("en-US")
        );
        strRefData.replace("{firstname}", reProfile.firstName);
        strRefData.replace("{lastName}", reProfile.lastName);
        strRefData.replace("{sellerPhone}", reProfile.sellerPhone);
        strRefData.replace("{streetAddress}", reProfile.address.streetAddress);
        strRefData.replace("{city}", reProfile.address.city);
        strRefData.replace("{stateProvinceOrRegion}", stateCode);
        strRefData.replace("{sellerEmail}", reProfile.sellerEmail);
        strRefData.replace("{rentBackPeriod}", reProfile.rentBackPeriod);
        strRefData.replace("{houseType}", reProfile.houseType);
        strRefData.replace("{bedrooms}", reProfile.bedrooms);
        strRefData.replace("{bathrooms}", reProfile.bathrooms);

        var referralPDFData = JSON.parse(strRefData);

        if (referralPDFData) {
          //generate pdf blob
          generatePDFDocument(
            referralPDFData,
            "S2RB_Referral_" + referralData.token + ".pdf"
          );
        } else {
          alert("There was an error generating the referral data for PDF");
        }
      }
    } catch (e) {
      console.log(e);
    }
    return null;
  };

  async function createReferral(evt) {
    var nextStatus = evt.currentTarget.getAttribute("next_status");
    saveReferral(null, currentProfileId);
    updateREProfileStatus(nextStatus); //to referral generated
  }

  function saveReferral(originalReferral, reProfileId) {
    (async () => {
      try {
        if (originalReferral) {
          //code for updating existing record
          await DataStore.save(
            Referral.copyOf(originalReferral, (updated) => {
              updated.status = "NEW"; //placeholder status - update referral not implemented yet
            })
          );
        } else {
          //new
          await DataStore.save(getNewReferral(reProfileId));
        }
      } catch (e) {
        console.log(e);
      }
    })();

    setRefSaved(true);
    setTimeout(() => {
      setRefSaved(false);
      closeDialog();
    }, 2000);
  }

  const handleChange = (setFunction) => (event) => {
    setFunction(event.target.value);
  };

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
      <Parallax smallheader />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <Card plain>
            <CardBody plain>
              <h3 className={classes.cardTitle}>Home Listings</h3>
              <Table
                tableHead={["", "", "", "", "", ""]}
                tableData={homeRows}
                tableShopping
                customHeadCellClasses={[
                  classes.textCenter,
                  classes.description,
                  classes.description,
                  classes.textRight,
                  classes.textRight,
                  classes.textRight,
                ]}
                customHeadClassesForCells={[0, 2, 3, 4, 5, 6]}
                customCellClasses={[
                  classes.tdName,
                  classes.customFont,
                  classes.customFont,
                  classes.tdNumber,
                  classes.tdNumber + " " + classes.tdNumberAndButtonGroup,
                  classes.tdNumber + " " + classes.textCenter,
                ]}
                customClassesForCells={[1, 2, 3, 4, 5, 6]}
              />
            </CardBody>
          </Card>
        </div>
      </div>

      <Dialog
        classes={{
          root: classes.center,
          paper: classes.modal,
        }}
        open={showViewDocuments}
        fullWidth={true}
        maxWidth={"md"}
        keepMounted
        TransitionComponent={Transition}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          id="alert-dialog-slide-title"
          className={classes.modalHeader}
        >
          <h4 className={classes.modalTitle}>Review Seller Documents</h4>
        </DialogTitle>
        <DialogContent>
          <table width="100%">
            <tr valign="top">
              <td width="35%" className={classes.tableCell}>
                <b>Mortgage Statements</b>
              </td>
              <td className={classes.tableCell}>
                <div id="mortgage_stmt">N/A</div>
              </td>
            </tr>
            <tr valign="top">
              <td className={classes.tableCell}>
                <b>Title Proof</b>
              </td>
              <td className={classes.tableCell}>
                <div id="title_proof">N/A</div>
              </td>
            </tr>
            <tr valign="top">
              <td className={classes.tableCell}>
                <b>Identity Proof</b>
              </td>
              <td className={classes.tableCell}>
                <div id="identity_proof">N/A</div>
              </td>
            </tr>
            <tr valign="top">
              <td className={classes.tableCell}>
                <b>Home Photos</b>
              </td>
              <td className={classes.tableCell}>
                <div id="home_photo">N/A</div>
              </td>
            </tr>
          </table>
        </DialogContent>
        <DialogActions className={classes.modalFooter}>
          <div style={{ visibility: "hidden" }}>
            <iframe width="1" height="1" src={currentDocURL}></iframe>
          </div>
          <Button
            color="success"
            next_status={RealEstateStatus.DOCS_REVIEWED}
            onClick={updateREProfileStatusOnClick}
          >
            Mark All Documents as Verified and Accepted
          </Button>
          <Button color="info" onClick={closeDialog}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        classes={{
          root: classes.center,
          paper: classes.modal,
        }}
        open={confirmModal}
        keepMounted
        TransitionComponent={Transition}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          id="alert-dialog-slide-title"
          className={classes.modalHeader}
        >
          <h4 className={classes.modalTitle}>Generate a new referral?</h4>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Please add a referral details and confirm if you want to generate a
            new referral for this real estate profile.
          </DialogContentText>
          <GridContainer>
            <GridItem lg={12}>
              <form>
                <FormControl
                  required
                  color="primary"
                  fullWidth
                  className={classes.selectFormControl}
                >
                  <InputLabel
                    htmlFor="clientReasonId"
                    className={classes.selectLabel}
                  >
                    Client selling reason / motivation
                  </InputLabel>
                  <Select
                    color="primary"
                    MenuProps={{
                      className: classes.selectMenu,
                    }}
                    classes={{
                      select: classes.select,
                    }}
                    value={clientReason}
                    onChange={handleChange(setClientReason)}
                    inputProps={{
                      name: "clientReason",
                      id: "clientReasonId",
                    }}
                  >
                    <MenuItem
                      disabled
                      classes={{
                        root: classes.selectMenuItem,
                      }}
                    >
                      Client Reason / Motivation
                    </MenuItem>
                    <MenuItem
                      classes={{
                        root: classes.selectMenuItem,
                        selected: classes.selectMenuItemSelected,
                      }}
                      value={ClientReason.FORBEARANCE}
                    >
                      {ClientReason.FORBEARANCE}
                    </MenuItem>
                    <MenuItem
                      classes={{
                        root: classes.selectMenuItem,
                        selected: classes.selectMenuItemSelected,
                      }}
                      value={ClientReason.FORECLOSURE}
                    >
                      {ClientReason.FORECLOSURE}
                    </MenuItem>
                    <MenuItem
                      classes={{
                        root: classes.selectMenuItem,
                        selected: classes.selectMenuItemSelected,
                      }}
                      value={ClientReason.RETIREMENT}
                    >
                      {ClientReason.RETIREMENT}
                    </MenuItem>
                    <MenuItem
                      classes={{
                        root: classes.selectMenuItem,
                        selected: classes.selectMenuItemSelected,
                      }}
                      value={ClientReason.MARKET}
                    >
                      {ClientReason.MARKET}
                    </MenuItem>
                    <MenuItem
                      classes={{
                        root: classes.selectMenuItem,
                        selected: classes.selectMenuItemSelected,
                      }}
                      value={ClientReason.OTHER}
                    >
                      {ClientReason.OTHER}
                    </MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth={true} className={classes.formControl}>
                  <TextField
                    required
                    className={classes.input}
                    label="Estimated Listing Price"
                    //value={listingPriceEstimate}
                    onBlur={handleChange(setListingPriceEstimate)}
                    id="listingPriceEstimate-input"
                    type="number"
                  />
                </FormControl>
                <FormControl fullWidth={true} className={classes.formControl}>
                  <TextField
                    className={classes.input}
                    label="Referral Note"
                    //value={referralNote}
                    onBlur={handleChange(setReferralNote)}
                    inputProps={{ maxLength: 30 }}
                    id="referralNote-input"
                  />
                </FormControl>
                <div className={classes.textCenter}>
                  <br />
                  <GridItem lg={12} style={refSaved ? {} : { display: "none" }}>
                    <SnackbarContent
                      message={<span>Referral saved.</span>}
                      color="success"
                    />
                  </GridItem>
                  <Button
                    color="warning"
                    onClick={createReferral}
                    next_status={RealEstateStatus.REFERRAL_GENERATED}
                  >
                    Create Referral
                  </Button>
                  <Button color="info" onClick={closeDialog}>
                    Cancel
                  </Button>
                </div>
              </form>
            </GridItem>
          </GridContainer>
        </DialogContent>
      </Dialog>
    </div>
  );
}
