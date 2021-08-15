import React from "react";
import Autocomplete from "react-google-autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import { Location } from "../models";

import GridContainer from "../common/components/GridContainer.js";
import GridItem from "../common/components/GridItem.js";
import Button from "../common/components/Button.js";
import styles from "./sellerProfileStyle.js";

const useStyles = makeStyles(styles);

export default function AddressSection(sliderRefContainer) {
  const classes = useStyles();
  var addressText = "";
  const s2rb_house_location = localStorage.getItem("s2rb_house_location");
  if (s2rb_house_location) {
    try {
      addressText = JSON.parse(s2rb_house_location).formattedAddress;
    } catch (e) {
      console.log("No saved address!");
    }
  }
  console.log(addressText);
  const storeLocation = (place) => {
    if (place) {
      var addrParts = place.address_components;
      var homeLocation = new Location({
        name: "Seller house address",
        description: "Address of house for S2RB consideration",
        streetAddress: addrParts[0].long_name + " " + addrParts[1].long_name,
        city: addrParts[2].long_name,
        adminArea: addrParts[3].long_name,
        stateProvinceOrRegion: addrParts[4].long_name,
        country: addrParts[5].long_name,
        countryCode: addrParts[5].short_name,
        postalCode: addrParts[6].long_name,
        postalCodeSuffix: addrParts[7].long_name,
        formattedAddress: place.formatted_address,
      });
      //console.log(homeLocation);
      localStorage.setItem("s2rb_house_location", JSON.stringify(homeLocation));
    } else {
      localStorage.removeItem("s2rb_house_location");
    }
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
    <div className={classes.questionPanel}>
      <GridContainer justify="center" className={classes.section}>
        <GridItem cs={12} sm={12} md={12} lg={12}>
          <h2>Where are you located?</h2>
        </GridItem>
        <GridItem lg={12}>
          <h3>Please enter the street address of your home.</h3>
        </GridItem>
        <GridItem lg={12}>
          <Autocomplete
            className={classes.label}
            apiKey="AIzaSyClKdZsG7s-7cURlYikEozYu3lUN_8oHV0"
            style={{ width: "90%" }}
            onPlaceSelected={(place) => {
              storeLocation(place);
            }}
            options={{
              types: ["geocode", "establishment"],
              componentRestrictions: { country: "us" },
            }}
            defaultValue={addressText}
          />
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
