import React from "react";
import { generatePath } from "react-router";

// @material-ui/core components

import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

// @material-ui/icons
import oneIcon from "@material-ui/icons/Filter1Outlined";
import twoIcon from "@material-ui/icons/Filter2Outlined";
import threeIcon from "@material-ui/icons/Filter3Outlined";

// core components
import GridContainer from "../common/components/GridContainer.js";
import GridItem from "../common/components/GridItem.js";
import InfoArea from "../common/components/InfoArea.js";
import Button from "../common/components/Button.js";
import Card from "../common/components/Card.js";
import CardBody from "../common/components/CardBody.js";
import CardHeader from "../common/components/CardHeader.js";

import styles from "./productStyle.js";

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();
  const signupURL = generatePath("/signup");
  const history = useHistory();

  const goSignUP = () => {
    history.push(signupURL);
  };

  return (
    <div className={classes.section} id="how-it-works">
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>Who is this for?</h2>
          <h3 className={classes.description}>
            Want to sell your home but stay on?
          </h3>
          <p>&nbsp;</p>
        </GridItem>
      </GridContainer>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={4}>
          <Card>
            <CardHeader color="warning" className={classes.cardHeader}>
              <b>Mortgage Forbearance Ending?</b>
            </CardHeader>
            <CardBody>
              <h5>
                You have taken mortgage forbearance in this pandemic and are
                looking for ways to avoid foreclosure till you can fully
                recover. This is for you.
              </h5>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card>
            <CardHeader color="info" className={classes.cardHeader}>
              <b>School Holding You Back?</b>
            </CardHeader>
            <CardBody>
              <h5>
                You want to take advantage of the great home prices and cash out
                but your kids are in school so you can&#39;t move for a couple
                of years? This is for you.
              </h5>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card>
            <CardHeader color="success" className={classes.cardHeader}>
              <b>Planning to Retire?</b>
            </CardHeader>
            <CardBody>
              <h5>
                Retirement is two years away and you want to stay in your home
                but you would rather sell now than risk a repeat of the
                real-estate downturn. This is for you.
              </h5>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>

      <GridContainer justify="center" className={classes.darkbg}>
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>Here&apos;s how it works</h2>
          <h3 className={classes.description}>
            <a href={signupURL} _target="_self">
              Sign-up
            </a>{" "}
            and create your real estate profile in minutes.
          </h3>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer className={classes.darkbg}>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Sign-up"
              onClick={goSignUP}
              description="We take data protection extremely seriously. That's why S2RB uses end to end encryption on all data. S2RB does not share your data without your authorization."
              icon={oneIcon}
              iconColor="success"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Complete House Profile"
              onClick={goSignUP}
              description="Provide details such as address, type of house, rent back period preference etc. This information will be used to find and match interested investors in the region."
              icon={twoIcon}
              iconColor="info"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Match Investors"
              onClick={goSignUP}
              size="lg"
              description="S2RB helps you find real-estate investors who can meet your rent-back and other preferences to create a win-win opportunity for you both. Feel free to communicate."
              icon={threeIcon}
              iconColor="warning"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <Button
              color="primary"
              size="lg"
              href={signupURL}
              target="_self"
              className={classes.navLink}
            >
              Sign Up
            </Button>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
