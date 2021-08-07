import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "../common/components/GridContainer.js";
import GridItem from "../common/components/GridItem.js";
import Button from "../common/components/Button.js";

import styles from "./workStyle.js";

const useStyles = makeStyles(styles);

export default function WorkSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem cs={12} sm={12} md={8}>
          <h2 className={classes.title}>Are you a real-estate investor?</h2>
          <h4 className={classes.description}>
            If you are looking for good real estate investment opportunities
            with long term rental income potential please write to us. A S2RB
            representative will contact you with next steps to be part of the
            investor pool.
          </h4>
          <center>
            <Button color="success">Write to Us</Button>
          </center>
        </GridItem>
      </GridContainer>
    </div>
  );
}
