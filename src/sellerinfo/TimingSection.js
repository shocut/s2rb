import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";

import GridContainer from "../common/components/GridContainer.js";
import GridItem from "../common/components/GridItem.js";
import Button from "../common/components/Button.js";
import styles from "../common/jss/sellerProfileStyle.js";

const useStyles = makeStyles(styles);

export default function TimingSection(sliderRefContainer) {
  const [value, setValue] = React.useState(
    localStorage.getItem("s2rb_search_stage")
  );

  const classes = useStyles();

  const handleChange = (event) => {
    setValue(event.target.value);
    localStorage.setItem("s2rb_search_stage", event.target.value);
  };
  const moveNext = function () {
    //sliderRef.current.slickNext();
    var carousalRef = sliderRefContainer.sliderRef.current;
    carousalRef.next();
  };
  return (
    <div className={classes.section}>
      <GridContainer justify="center" className={classes.section}>
        <GridItem cs={12} sm={12} md={12}>
          <h2>Please share your goals and house profile</h2>
        </GridItem>
        <GridItem cs={12} sm={12} md={12}>
          <h3>Where are you in the process?</h3>
        </GridItem>
        <GridItem cs={12} sm={12} md={12}>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="searchStage"
              name="searchStage"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                value="s1"
                control={<Radio />}
                label="I am just researching"
              />
              <FormControlLabel
                value="s2"
                control={<Radio />}
                label="I am actively considering if I should sell the house"
              />
              <FormControlLabel
                value="s3"
                control={<Radio />}
                label="I am already working with a realtor and my mortgage bank"
              />
            </RadioGroup>
          </FormControl>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          &nbsp;
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Button color="success" onClick={moveNext}>
            Next
          </Button>
        </GridItem>
      </GridContainer>
    </div>
  );
}
