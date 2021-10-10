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
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const useStyles = makeStyles(styles);

export default function AddressSection(sliderRefContainer) {
  const classes = useStyles();
  var addressText = "";
  const s2rb_house_location = localStorage.getItem("s2rb_house_location");
  const [classicModal, setClassicModal] = React.useState(false);

  const [bedrooms, setBedrooms] = useState(
    localStorage.getItem("s2rb_bedrooms")
  );
  const [bathrooms, setBathrooms] = useState(
    localStorage.getItem("s2rb_bathrooms")
  );

  const closeDialog = () => {
    setClassicModal(false);
  };

  if (s2rb_house_location) {
    try {
      addressText = JSON.parse(s2rb_house_location).formattedAddress;
    } catch (e) {
      console.log("No saved address!");
    }
  }

  const addressTyped = () => {
    localStorage.removeItem("s2rb_house_location");
  };

  const bathroomsChanged = (event, newValue) => {
    localStorage.setItem("s2rb_bathrooms", newValue);
    setBathrooms(newValue);
  };

  const bedroomsChanged = (event, newValue) => {
    localStorage.setItem("s2rb_bedrooms", newValue);
    setBedrooms(newValue);
  };

  const storeLocation = (place) => {
    if (place) {
      try {
        var result = place.address_components;
        var addrMap = new Map();
        for (var i = 0; i < result.length; ++i) {
          if (result[i].types[0] == "street_number") {
            addrMap.set("streetNumber", result[i].long_name);
          }
          if (result[i].types[0] == "route") {
            addrMap.set("streetName", result[i].long_name);
          }
          if (result[i].types[0] == "locality") {
            addrMap.set("city", result[i].long_name);
          }
          if (result[i].types[0] == "administrative_area_level_1") {
            addrMap.set("stateProvinceOrRegion", result[i].short_name);
          }
          if (result[i].types[0] == "administrative_area_level_2") {
            addrMap.set("adminArea", result[i].long_name);
          }
          if (result[i].types[0] == "country") {
            addrMap.set("countryCode", result[i].short_name);
            addrMap.set("country", result[i].long_name);
          }
          if (result[i].types[0] == "postal_code") {
            addrMap.set("postalCode", result[i].long_name);
          }
          if (result[i].types[0] == "postal_code_suffix") {
            addrMap.set("postalCodeSuffix", result[i].long_name);
          }
        }
        var homeLocation = new Location({
          name: "Seller house address",
          description: "Address of house for S2RB consideration",
          streetAddress:
            addrMap.get("streetNumber") + " " + addrMap.get("streetName"),
          city: addrMap.get("city"),
          adminArea: addrMap.get("adminArea"),
          stateProvinceOrRegion: addrMap.get("stateProvinceOrRegion"),
          country: addrMap.get("country"),
          countryCode: addrMap.get("countryCode"),
          postalCode: addrMap.get("postalCode"),
          postalCodeSuffix: addrMap.get("postalCodeSuffix"),
          formattedAddress: place.formatted_address,
        });
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
    if (!localStorage.getItem("s2rb_house_location")) {
      setClassicModal(true);
      return false;
    }
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
            className={classes.input}
            apiKey="AIzaSyClKdZsG7s-7cURlYikEozYu3lUN_8oHV0"
            style={{ width: "90%" }}
            onChange={addressTyped}
            onPlaceSelected={(place) => {
              storeLocation(place);
            }}
            options={{
              types: ["address"],
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
          <h3>Number of bathrooms: (For half baths pick 1.5, 2.5 ...)</h3>
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
      <Dialog
        classes={{
          root: classes.center,
          paper: classes.modal,
        }}
        open={classicModal}
        keepMounted
        TransitionComponent={Transition}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          id="alert-dialog-slide-title"
          disableTypography
          className={classes.modalHeader}
        >
          <h4 className={classes.modalTitle}>House Address Input</h4>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Please enter a valid address. You can pick from the addresses
            suggested as you type in the address input.
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.modalFooter}>
          <Button color="success" onClick={closeDialog}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
