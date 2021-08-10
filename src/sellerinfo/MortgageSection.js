import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

// core components
import GridContainer from "../common/components/GridContainer.js";
import GridItem from "../common/components/GridItem.js";
import Button from "../common/components/Button.js";
import styles from "../common/jss/sellerProfileStyle.js";

const useStyles = makeStyles(styles);

export default function MortgageSection() {
  const classes = useStyles();
  const [selectedEnabled, setSelectedEnabled] = React.useState("b");

  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem cs={12} sm={12} md={8}>
          <h2>Please share your goals and house profile</h2>
          <form>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12} lg={12}>
                <div>
                  <h3>Where are you in the process?</h3>
                </div>
                <div
                  className={
                    classes.checkboxAndRadio +
                    " " +
                    classes.checkboxAndRadioHorizontal
                  }
                >
                  <FormControlLabel
                    control={
                      <Radio
                        checked={selectedEnabled === "s1"}
                        onChange={() => setSelectedEnabled("s1")}
                        value="s1"
                        name="searchStage"
                        aria-label="s1"
                        classes={{
                          checked: classes.radio,
                          root: classes.radioRoot,
                        }}
                      />
                    }
                    classes={{
                      label: classes.label,
                      root: classes.labelRoot,
                    }}
                    label="I am just researching"
                  />
                </div>
                <div
                  className={
                    classes.checkboxAndRadio +
                    " " +
                    classes.checkboxAndRadioHorizontal
                  }
                >
                  <FormControlLabel
                    control={
                      <Radio
                        checked={selectedEnabled === "s2"}
                        onChange={() => setSelectedEnabled("s2")}
                        value="s2"
                        name="searchStage"
                        aria-label="s2"
                        classes={{
                          checked: classes.radio,
                          root: classes.radioRoot,
                        }}
                      />
                    }
                    classes={{
                      label: classes.label,
                      root: classes.labelRoot,
                    }}
                    label="I am actively considering if I should sell the house."
                  />
                </div>

                <div
                  className={
                    classes.checkboxAndRadio +
                    " " +
                    classes.checkboxAndRadioHorizontal
                  }
                >
                  <FormControlLabel
                    control={
                      <Radio
                        checked={selectedEnabled === "s3"}
                        onChange={() => setSelectedEnabled("s3")}
                        value="s3"
                        name="searchStage"
                        aria-label="s3"
                        classes={{
                          checked: classes.radio,
                          root: classes.radioRoot,
                        }}
                      />
                    }
                    classes={{
                      label: classes.label,
                      root: classes.labelRoot,
                    }}
                    label="I am already working with a realtor and my mortgage bank."
                  />
                </div>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                &nbsp;
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <Button color="primary">Next</Button>
              </GridItem>
            </GridContainer>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
}
