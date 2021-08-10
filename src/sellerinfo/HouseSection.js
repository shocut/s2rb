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

export default function HouseSection(sliderRefContainer) {
  const [value, setValue] = React.useState(
    localStorage.getItem("s2rb_house_type")
  );
  const [primaryHome, setPrimaryHome] = React.useState(
    localStorage.getItem("s2rb_primary_home")
  );
  const classes = useStyles();

  const handleChange = (event) => {
    setValue(event.target.value);
    localStorage.setItem("s2rb_house_type", event.target.value);
  };
  const handleChangePH = (event) => {
    setPrimaryHome(event.target.value);
    localStorage.setItem("s2rb_primary_home", event.target.value);
  };
  const moveNext = function () {
    //sliderRef.current.slickNext();
    var carousalRef = sliderRefContainer.sliderRef.current;
    carousalRef.next();
  };
  const movePrev = function () {
    //sliderRef.current.slickNext();
    var carousalRef = sliderRefContainer.sliderRef.current;
    carousalRef.prev();
  };
  return (
    <div className={classes.section}>
      <GridContainer justify="center" className={classes.section}>
        <GridItem cs={12} sm={12} md={12} lg={12}>
          <h2>Thats great! You are at the right place.</h2>
        </GridItem>
        <GridItem lg={12}>
          <h3>What type of house is it?</h3>
        </GridItem>
        <GridItem lg={12}>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="houseType"
              name="houseType"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                value="sfh"
                control={<Radio />}
                label="It is a Single Family Home"
              />
              <FormControlLabel
                value="th"
                control={<Radio />}
                label="It is a Town Home"
              />
              <FormControlLabel
                value="c"
                control={<Radio />}
                label="It is a Condo"
              />
            </RadioGroup>
          </FormControl>
        </GridItem>
        <GridItem lg={12}>
          <div>
            <h3>Is this your primary residence?</h3>
          </div>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="primaryHome"
              name="primaryHome"
              value={primaryHome}
              onChange={handleChangePH}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </GridItem>
        <GridItem lg={12}>&nbsp;</GridItem>
        <GridItem lg={12}>
          {" "}
          <Button color="warning" onClick={movePrev}>
            Prev
          </Button>
          <Button color="success" onClick={moveNext}>
            Next
          </Button>
        </GridItem>
      </GridContainer>
    </div>
  );
}
