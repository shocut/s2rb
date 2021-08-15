import React from "react";
import Radio from "@material-ui/core/Radio";

//for amplify and datastore
import { DataStore } from "aws-amplify";
import { SellerRealEstateProfile } from "../models";

import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";

import GridContainer from "../common/components/GridContainer.js";
import GridItem from "../common/components/GridItem.js";
import Button from "../common/components/Button.js";
import styles from "./sellerProfileStyle.js";

const useStyles = makeStyles(styles);

export default function RentBackSection(sliderRefContainer) {
  const [value, setValue] = React.useState(
    localStorage.getItem("s2rb_rentBackPeriod")
  );
  const [fror, setFROR] = React.useState(localStorage.getItem("s2rb_fror"));
  const classes = useStyles();

  var reProfileOriginal = localStorage.getItem("s2rb_re_profile");
  var reProfileOriginalObj = null;
  if (reProfileOriginal) {
    try {
      reProfileOriginalObj = JSON.parse(reProfileOriginal);
      delete reProfileOriginalObj.createdAt;
      delete reProfileOriginalObj.updatedAt;
    } catch (e) {}
  }

  const handleChange = (event) => {
    setValue(event.target.value);
    localStorage.setItem("s2rb_rentBackPeriod", event.target.value);
  };

  useEffect(() => {
    var currentUser = localStorage.getItem("currentUser");
    var userObj = null;
    if (currentUser) {
      userObj = JSON.parse(currentUser);
      console.log("userObj username:" + userObj.username);
    }
    const loadREProfile = async () => {
      if (userObj) {
        setREProfile(
          await DataStore.query(
            SellerRealEstateProfile,
            reProfileOriginalObj.id
          )
        );
      }
    };
    loadREProfile();
  }, []);

  const setREProfile = (reProfileList) => {
    console.log(reProfileList);
    if (reProfileList) {
      var reProfile = reProfileList[0];
      localStorage.setItem("s2rb_re_profile", JSON.stringify(reProfile));
      //store locally for UI
      localStorage.setItem("s2rb_search_stage", reProfile.searchStage);
      localStorage.setItem("s2rb_house_type", reProfile.houseType);
      localStorage.setItem("s2rb_primary_home", reProfile.primaryHome);
      localStorage.setItem("s2rb_rentBackPeriod", reProfile.rentBackPeriod);
      localStorage.setItem(
        "s2rb_house_location",
        JSON.stringify(reProfile.address)
      );
    }
  };

  const saveToDataStore = (event) => {
    //save to datastore
    var currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      var userObj = JSON.parse(currentUser);
      var homeAddress = localStorage.getItem("s2rb_house_location");
      console.log("userObj userName:" + userObj.username);

      var sellerRealEstateProfile = new SellerRealEstateProfile({
        sellerReference: userObj.username,
        searchStage: localStorage.getItem("s2rb_search_stage"),
        houseType: localStorage.getItem("s2rb_house_type"),
        primaryHome: localStorage.getItem("s2rb_primary_home"),
        rentBackPeriod: localStorage.getItem("s2rb_rentBackPeriod"),
        address: JSON.parse(homeAddress),
      });
      if (reProfileOriginalObj) {
        //code for merging or versioning

        const original = await DataStore.query(
          SellerRealEstateProfile,
          reProfileOriginalObj.id
        );

        DataStore.save(
          SellerRealEstateProfile.copyOf(original, sellerRealEstateProfile)

          /*
          SellerRealEstateProfile.copyOf(reProfileOriginalObj, (updated) => {
            updated.houseType = localStorage.getItem("s2rb_house_type");
          })
          */
        );
      } else {
        DataStore.save(sellerRealEstateProfile);
      }
    } else {
      alert("Please sign-in to save your real estate profile");
    }
  };

  const handleChangeFROR = (event) => {
    setFROR(event.target.value);
    localStorage.setItem("s2rb_fror", event.target.value);
  };

  const movePrev = function () {
    //sliderRef.current.slickNext();
    var carousalRef = sliderRefContainer.sliderRef.current;
    carousalRef.prev();
  };
  return (
    <div className={classes.questionPanel}>
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
                value="1-2-Years"
                control={<Radio />}
                label="One to Two Years"
              />
              <FormControlLabel
                value="3-4-years"
                control={<Radio />}
                label="Three to Four Years"
              />
              <FormControlLabel
                value="5-or-more-years"
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

          <Button color="primary" onClick={saveToDataStore}>
            Complete
          </Button>
        </GridItem>
      </GridContainer>
    </div>
  );
}
