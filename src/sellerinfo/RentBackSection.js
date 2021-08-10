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

export default function RentBackSection(sliderRefContainer) {
  const [value, setValue] = React.useState(
    localStorage.getItem("s2rb_house_type")
  );
  const [fror, setFROR] = React.useState(localStorage.getItem("s2rb_fror"));
  const classes = useStyles();

  const handleChange = (event) => {
    setValue(event.target.value);
    localStorage.setItem("s2rb_house_type", event.target.value);
  };
  const handleChangeFROR = (event) => {
    setFROR(event.target.value);
    localStorage.setItem("s2rb_fror", event.target.value);
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
        <GridItem cs={12} sm={12} md={12}>
          <h2>Your best case preference after sale...</h2>
        </GridItem>
        <GridItem cs={12} sm={12} md={12}>
          <h3>For how long do you plan to rent back the home?</h3>
        </GridItem>
        <GridItem cs={12} sm={12} md={12}>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="rentBackPeriod"
              name="rentBackPeriod"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                value="sfh"
                control={<Radio />}
                label="One to Two Years"
              />
              <FormControlLabel
                value="th"
                control={<Radio />}
                label="Three to Four Years"
              />
              <FormControlLabel
                value="c"
                control={<Radio />}
                label="Five Years or More"
              />
            </RadioGroup>
          </FormControl>
        </GridItem>
        <GridItem xs={12} sm={12} md={12} lg={12}>
          <div>
            <h3>
              If you want to buy the house back, would you like to have
              &quot;First right of refusal&quot;?
            </h3>
          </div>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="fror"
              name="fror"
              value={fror}
              onChange={handleChangeFROR}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          &nbsp;
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Button color="warning" onClick={movePrev}>
            Prev
          </Button>

          <Button color="primary" onClick={moveNext}>
            Complete
          </Button>
        </GridItem>
      </GridContainer>
    </div>
  );
}
