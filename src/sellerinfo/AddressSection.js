import React from "react";
import { useState } from "react";

import Autocomplete from "react-google-autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import { Location } from "../models";

import GridContainer from "../common/components/GridContainer.js";
import GridItem from "../common/components/GridItem.js";
import Button from "../common/components/Button.js";
import styles from "./sellerProfileStyle.js";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles(styles);

export default function AddressSection(sliderRefContainer) {
  const classes = useStyles();
  var addressText = "";
  const s2rb_house_location = localStorage.getItem("s2rb_house_location");
  const [bedrooms, setBedrooms] = useState(
    localStorage.getItem("s2rb_bedrooms")
  );
  const [bathrooms, setBathrooms] = useState(
    localStorage.getItem("s2rb_bathrooms")
  );

  if (s2rb_house_location) {
    try {
      addressText = JSON.parse(s2rb_house_location).formattedAddress;
    } catch (e) {
      console.log("No saved address!");
    }
  }

  const bathroomsChanged = (event, newValue) => {
    console.log(newValue);
    localStorage.setItem("s2rb_bathrooms", newValue);
    setBathrooms(newValue);
  };

  const bedroomsChanged = (event, newValue) => {
    console.log(newValue);
    localStorage.setItem("s2rb_bedrooms", newValue);
    setBedrooms(newValue);
  };

  const storeLocation = (place) => {
    if (place) {
      try {
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
        localStorage.setItem(
          "s2rb_house_location",
          JSON.stringify(homeLocation)
        );
      } catch (e) {
        console.log(e);
        localStorage.removeItem("s2rb_house_location");
      }
    } else {
      localStorage.removeItem("s2rb_house_location");
    }
  };

  const marks = [
    {
      value: 1,
      label: "1",
    },
    {
      value: 2,
      label: "2",
    },
    {
      value: 3,
      label: "3",
    },
    {
      value: 4,
      label: "4",
    },
    {
      value: 5,
      label: "5",
    },
    {
      value: 6,
      label: "6",
    },
    {
      value: 7,
      label: "7",
    },
    {
      value: 8,
      label: "8",
    },
    {
      value: 9,
      label: "9",
    },
    {
      value: 10,
      label: "10+",
    },
  ];

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
          <h2>Please share a few details about your house</h2>
        </GridItem>
        <GridItem lg={12}>
          <h3>Where is it located?</h3>
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
        <GridItem cs={12} sm={12} md={12}>
          <br />
          <h3>Number of bedrooms:</h3>
        </GridItem>
        <GridItem cs={12} sm={12} md={12}>
          <br />
          <div className={classes.sliderContainer}>
            <Slider
              name="bedrooms"
              value={bedrooms || "1"}
              onChange={bedroomsChanged}
              min={1}
              step={1}
              max={10}
              marks={marks}
              valueLabelDisplay="on"
            />
          </div>
        </GridItem>
        <GridItem cs={12} sm={12} md={12}>
          <h3>Number of bathrooms:</h3>
        </GridItem>
        <GridItem cs={12} sm={12} md={12}>
          <br />
          <div className={classes.sliderContainer}>
            <Slider
              name="bathrooms"
              value={bathrooms || "1"}
              onChange={bathroomsChanged}
              min={1}
              step={0.5}
              max={10}
              marks={marks}
              valueLabelDisplay="on"
            />
          </div>
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
