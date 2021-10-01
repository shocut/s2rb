/* eslint-disable */

import React from "react";
import ReactDOM from "react-dom";

import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { Storage } from "aws-amplify";
import { Auth } from "aws-amplify";

// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { DataStore } from "aws-amplify";
import { SellerRealEstateProfile, RealEstateStatus } from "../models";

// @material-ui/icons
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";

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
import NavPills from "../common/components/NavPills.js";

import listingStyle from "./listingStyle.js";
import { getSourceMapRange } from "typescript";

const useStyles = makeStyles(listingStyle);
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default function HomeList() {
  const classes = useStyles();
  const history = useHistory();

  const dashboardRoutes = [];
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const [homeRows, setHomeRows] = useState([]);
  const [currentUser, setCurrentUser] = useState(
    localStorage.getItem("currentUser")
  );
  const [showViewDocuments, setShowViewDocuments] = useState(false);
  const [reProfileAttchMap, setREProfileAttchMap] = useState(new Map());
  const [currrentAttachments, setCurrrentAttachments] = useState([]);
  const [currrentSellerRef, setCurrrentSellerRef] = useState("");
  const [currentDocURL, setCurrentDocURL] = useState("");
  const [reProfileId, setReProfileId] = useState("");

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
        const groups =
          currentUser.signInUserSession.accessToken.payload["cognito:groups"];
        console.log("groups", groups);
        if (
          !groups ||
          (!groups.includes("admin") && !groups.includes("operator"))
        ) {
          console.log("not for you");
          var nextPage = "/sdashboard";
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
    var userObj = null;
    var currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      userObj = JSON.parse(currentUser);
    }

    const loadREProfiles = async () => {
      try {
        var reProfiles = await DataStore.query(SellerRealEstateProfile, (p) =>
          p.or((p) =>
            p
              .status("eq", "DOCS_UPLOADED")
              .status("eq", "DOCS_IN_REVIEW")
              .status("eq", "DOCS_REVIEWED")
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
  };

  const reviewDocs = (evt) => {
    var sellerReference = evt.currentTarget.getAttribute("seller_reference");
    var reProfileId = evt.currentTarget.getAttribute("re_profile_id");
    var attchArray = reProfileAttchMap.get(sellerReference);
    setCurrrentAttachments(attchArray);
    setCurrrentSellerRef(sellerReference);
    setReProfileId(reProfileId);
    setShowViewDocuments(true);
    addAttachmentLinks(sellerReference, attchArray);
  };

  const onDocClick = (evt) => {
    var fileKey = evt.currentTarget.getAttribute("file_key");
    var sellerReference = evt.currentTarget.getAttribute("seller_reference");
    getDocumentURL(sellerReference, fileKey);
  };

  async function getDocumentURL(sellerReference, fileKey) {
    var docURL = "";
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
    var docLinks = [];
    var docMap = new Map();
    if (!sellerReference || !attachments) {
      sellerReference = currrentSellerRef;
      attachments = currrentAttachments;
      console.log(sellerReference, attachments);
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
        console.log("key", key);
        //if (arrayValue.length > 0)
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
      //add iframe - could do this statically...
      const iframeElement = React.createElement("iframe", {
        src: "",
        id: "docIframe",
        height: 600,
        width: 800,
      });
    }
  };

  function homeListRow(index, item) {
    return [
      <div className={classes.imgContainer} key={1} id={item.id}>
        <HomeOutlinedIcon
          fontSize="inherit"
          color="inherit"
          className={classes.thumbNail}
        />
      </div>,
      <span key={1}>
        <a href="#home" className={classes.tdNameAnchor}>
          {item.houseType}
        </a>
        <br />
        <small className={classes.tdNameSmall}>
          {item.bedrooms} beds, {item.bathrooms} baths
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
      <Button
        size="sm"
        color="warning"
        seller_reference={item.sellerReference}
        re_profile_id={item.id}
        onClick={reviewDocs}
      >
        Review Documents
      </Button>,
      <Button size="sm" color="success">
        Initiate Referral
      </Button>,
    ];
  }

  function setHomeThumbnails(reProfileArray) {
    //get the first home image to use as a thumbnail and then skip the rest
    //do this for all seller profiles which have attachments
    var thumbNailArray = [];
    reProfileArray.forEach((element, index) => {
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
      } else {
        thumbNailArray.push(
          <HomeOutlinedIcon
            fontSize="inherit"
            color="inherit"
            className={classes.thumbNail}
          />
        );
      }
    });
    return thumbNailArray;
    //forceUpdate(true);
  }

  const markDocsReviewed = async () => {
    console.log("in saveToDataStore");
    try {
      updateREProfileStatus(
        await DataStore.query(SellerRealEstateProfile, reProfileId)
      );
    } catch (e) {
      console.log(e);
      setShowViewDocuments(false);
    }
  };

  function updateREProfileStatus(originalREObj) {
    console.log("in updateREProfileStatus: ");
    setShowViewDocuments(false);
    if (originalREObj) {
      DataStore.save(
        SellerRealEstateProfile.copyOf(originalREObj, (updated) => {
          updated.status = RealEstateStatus.DOCS_REVIEWED;
        })
      );
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
          <Button color="success" onClick={markDocsReviewed}>
            Mark All Documents as Verified and Accepted
          </Button>
          <Button color="info" onClick={closeDialog}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
