import React from "react";
import { useHistory } from "react-router-dom";

import Radio from "@material-ui/core/Radio";

//for amplify and datastore
import { DataStore } from "aws-amplify";
import { SellerRealEstateProfile } from "../models";

import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";

import GridContainer from "../common/components/GridContainer.js";
import GridItem from "../common/components/GridItem.js";
import Button from "../common/components/Button.js";
import styles from "./sellerProfileStyle.js";

const useStyles = makeStyles(styles);

export default function RentBackSection(sliderRefContainer) {
  const history = useHistory();
  const [classicModal, setClassicModal] = React.useState(false);
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  });
  const [value, setValue] = React.useState(
    localStorage.getItem("s2rb_rentBackPeriod")
  );
  const classes = useStyles();

  var reProfileId = localStorage.getItem("s2rb_re_profile_id");
  var homeAddress = localStorage.getItem("s2rb_house_location");
  var homeAddressObj = null;
  if (homeAddress) {
    try {
      homeAddressObj = JSON.parse(homeAddress);
    } catch (e) {
      console.log(e);
    }
  }

  const closeDialog = () => {
    setClassicModal(false);
    history.push("/sdashboard");
  };

  const handleChange = (event) => {
    setValue(event.target.value);
    localStorage.setItem("s2rb_rentBackPeriod", event.target.value);
  };

  var currentUser = localStorage.getItem("currentUser");
  var userObj = null;
  if (currentUser) {
    userObj = JSON.parse(currentUser);
  }
  const saveToDataStore = async () => {
    if (userObj) {
      if (reProfileId) {
        saveREProfile(
          await DataStore.query(SellerRealEstateProfile, reProfileId)
        );
      } else {
        saveREProfile(null);
      }
    }
  };

  function getNewREProfile() {
    return new SellerRealEstateProfile({
      sellerReference: userObj.attributes.email,
      searchStage: localStorage.getItem("s2rb_search_stage"),
      houseType: localStorage.getItem("s2rb_house_type"),
      primaryHome: localStorage.getItem("s2rb_primary_home"),
      rentBackPeriod: localStorage.getItem("s2rb_rentBackPeriod"),
      address: homeAddressObj,
      bedrooms: localStorage.getItem("s2rb_bedrooms"),
      bathrooms: localStorage.getItem("s2rb_bathrooms"),
    });
  }

  function saveREProfile(originalREObj) {
    if (originalREObj) {
      //code for updating existing record
      DataStore.save(
        SellerRealEstateProfile.copyOf(originalREObj, (updated) => {
          updated.searchStage = localStorage.getItem("s2rb_search_stage");
          updated.houseType = localStorage.getItem("s2rb_house_type");
          updated.primaryHome = localStorage.getItem("s2rb_primary_home");
          updated.rentBackPeriod = localStorage.getItem("s2rb_rentBackPeriod");
          updated.address = homeAddressObj;
          updated.bedrooms = localStorage.getItem("s2rb_bedrooms");
          updated.bathrooms = localStorage.getItem("s2rb_bathrooms");
        })
      );
    } else {
      //new
      DataStore.save(getNewREProfile());
    }
    setClassicModal(true);
  }

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
                value="One to Two Years"
                control={<Radio />}
                label="One to Two Years"
              />
              <FormControlLabel
                value="Three to Four Years"
                control={<Radio />}
                label="Three to Four Years"
              />
              <FormControlLabel
                value="Five Years or More"
                control={<Radio />}
                label="Five Years or More"
              />
              <FormControlLabel
                value="Not Sure"
                control={<Radio />}
                label="Not Sure "
              />
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

      <Dialog
        classes={{
          root: classes.center,
          paper: classes.modal,
        }}
        open={classicModal}
        keepMounted
        TransitionComponent={Transition}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          id="alert-dialog-slide-title"
          disableTypography
          className={classes.modalHeader}
        >
          <h4 className={classes.modalTitle}>Real Estate Profile</h4>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Your real estate profile has been saved.
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
