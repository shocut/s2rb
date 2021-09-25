/*eslint-disable*/
import React from "react";
import { useEffect, useState } from "react";
import { Storage, Region } from "aws-amplify";

// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { DataStore } from "aws-amplify";
import { SellerRealEstateProfile } from "../models";

import Tooltip from "@material-ui/core/Tooltip";
// @material-ui/icons
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";

// core components
import Header from "../common/components/Header.js";
import HeaderLinks from "../common/components/HeaderLinks.js";
import Parallax from "../common/components/Parallax.js";
import GridContainer from "../common/components/GridContainer.js";
import GridItem from "../common/components/GridItem.js";
import Footer from "../common/components/Footer.js";
import Table from "../common/components/Table.js";
import Button from "../common/components/Button.js";
import Card from "../common/components/Card.js";
import CardBody from "../common/components/CardBody.js";

import listingStyle from "./listingStyle.js";

import product1 from "../common/img/product1.jpg";

const useStyles = makeStyles(listingStyle);

export default function ShoppingCartPage() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });
  const classes = useStyles();
  const dashboardRoutes = [];
  const [reProfiles, setREProfiles] = useState([]);
  const [thumbNails, setThumbNails] = useState([]);
  const [repaintCount, setRepaintCount] = useState(0);

  /*eslint-disable*/
  const [homeRows, setHomeRows] = useState([]);

  const onLogout = async () => {
    console.log("in log out - clearing localstorage");
    localStorage.clear();
    await Auth.signOut();
    checkLoginState();
  };

  const checkLoginState = async () => {
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      const groups =
        user.signInUserSession.accessToken.payload["cognito:groups"];
      console.log(JSON.stringify(groups));
      console.log(groups.includes("admin"));
      if (currentUser) {
        setCurrentUser(currentUser);
      }
    } catch (e) {
      setCurrentUser(null);
    }
  };

  function homeListRow(index, item) {
    return [
      <div className={classes.imgContainer} key={1}>
        {thumbNails[index]}
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
        </small>
      </span>,
      <span key={1}>
        <small className={classes.tdNumberSmall}></small>
      </span>,
      <Button size="sm" color="warning">
        Review Documents
      </Button>,
      <Button size="sm" color="success">
        Initiate Referral
      </Button>,
    ];
  }

  function getHomeImages(reProfiles) {
    //get the first home image to use as a thumbnail and then skip the rest
    //do this for all seller profiles which have attachments
    var tmpThumbs = thumbNails.slice();
    reProfiles.forEach((element, index) => {
      if (element.attachments && element.attachments.length > 0) {
        element.attachments.some((attch) => {
          console.log("attch.category: ", attch.category);
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
                tmpThumbs[index] = imgNode;
              })
              .catch((err) => console.log(err));

            return true; //exit the some loop after finding first home photo
          }
        });
      }
    });
    setThumbNails(tmpThumbs);
    setRepaintCount(repaintCouont + 1);
    console.log("repaint count: ", repaintCount);
  }

  useEffect(() => {
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
        var tableData = [];
        var thumbNailArray = [];
        reProfiles.forEach((element, index) => {
          thumbNailArray.push(
            <HomeOutlinedIcon
              fontSize="inherit"
              color="inherit"
              className={classes.thumbNail}
            />
          );
          tableData.push(homeListRow(index, element));
        });
        setHomeRows(tableData);
        setThumbNails(thumbNailArray);
        getHomeImages(reProfiles);
      } catch (e) {
        console.log(e);
      }
    };
    loadREProfiles();
  }, []);

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
                tableHead={["", "Details", "", "", "", ""]}
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
    </div>
  );
}
