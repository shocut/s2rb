import React from "react";
import { useState } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { DataStore } from "aws-amplify";
import { InvestorInterest } from "../models";

// @material-ui/icons

// core components
import GridContainer from "../common/components/GridContainer.js";
import GridItem from "../common/components/GridItem.js";
import CustomInput from "../common/components/CustomInput.js";
import Button from "../common/components/Button.js";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Slide from "@material-ui/core/Slide";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";
import SnackbarContent from "../common/components/SnackbarContent.js";

import styles from "./contactUsStyle.js";
const useStyles = makeStyles(styles);
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default function ContactUs() {
  const classes = useStyles();
  const [contactFormShow, setContactFormShow] = useState(false);

  const [investmentRange, setInvestmentRange] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [phoneErr, setPhoneErr] = useState(false);
  const [msgErr, setMsgErr] = useState(false);
  const [msgSent, setmsgSent] = useState(false);

  const [financing, setFinancing] = useState("");
  const [message, setMessage] = useState("");

  //TODO - These need to be replaced with library based validation. This is a demo version!!!
  const closeDialog = () => {
    setContactFormShow(false);
  };

  const showContactForm = () => {
    setContactFormShow(true);
  };
  const investmentRangeChanged = (event) => {
    setInvestmentRange(event.target.value);
  };
  const financingChanged = (event) => {
    setFinancing(event.target.value);
  };
  const nameChanged = (event) => {
    setName(event.target.value);
  };

  const emailChanged = (event) => {
    /* eslint-disable */
    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value)
    ) {
      setEmail(event.target.value);
      setEmailErr(false);
    } else {
      setEmailErr(true);
    }
  };

  const phoneChanged = (event) => {
    if (event.target.value.match(/^\d{10}$/)) {
      setPhone(event.target.value);
      setPhoneErr(false);
    } else {
      setPhoneErr(true);
    }
  };
  const messageChanged = (event) => {
    if (event.target.value.trim().length > 0) {
      setMessage(event.target.value);
      setMsgErr(false);
    } else {
      setMsgErr(true);
    }
  };

  function saveInvestorInterest() {
    var investorInterest = new InvestorInterest({
      name: name,
      email: email,
      phone: phone,
      investmentRange: investmentRange,
      financing: financing,
      addrfinancingess: financing,
      message: message,
    });
    DataStore.save(investorInterest);
    setmsgSent(true);
    setTimeout(() => {
      setmsgSent(false);
      closeDialog();
    }, 3000);
  }

  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem cs={12} sm={12} md={8}>
          <center>
            <h2 className={classes.title}>Are you a real-estate investor?</h2>
            <h4 className={classes.description}>
              If you are looking for good real estate investment opportunities
              with long term rental income potential please write to us. A S2RB
              representative will contact you with next steps to be part of the
              investor pool.
            </h4>
            <Button color="success" onClick={showContactForm}>
              Write to Us
            </Button>
          </center>
        </GridItem>
        <Dialog
          classes={{
            root: classes.center,
            paper: classes.modal,
          }}
          open={contactFormShow}
          keepMounted
          TransitionComponent={Transition}
          onClose={closeDialog}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle
            id="alert-dialog-slide-title"
            className={classes.modalHeader}
          >
            <h4 className={classes.modalTitle}>Investor Interest Form</h4>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <GridContainer>
                <GridItem lg={12}>
                  <p>
                    Thank you for your interest in the S2RB platform. Our
                    investor representatives will get in touch with you as soon
                    as possible.
                    <br />
                  </p>
                  <form>
                    <CustomInput
                      labelText="Your Name"
                      id="nameId"
                      formControlProps={{
                        fullWidth: true,
                        onBlur: nameChanged,
                      }}
                    />
                    <CustomInput
                      labelText="Email address"
                      id="emailId"
                      error={emailErr}
                      formControlProps={{
                        fullWidth: true,
                        onBlur: emailChanged,
                      }}
                    />
                    <CustomInput
                      labelText="Phone"
                      error={phoneErr}
                      id="phoneId"
                      formControlProps={{
                        fullWidth: true,
                        onBlur: phoneChanged,
                      }}
                    />
                    <FormControl
                      color="primary"
                      fullWidth
                      className={classes.selectFormControl}
                    >
                      <InputLabel
                        htmlFor="investmentRangeId"
                        className={classes.selectLabel}
                      >
                        Target Investment Range (Spanning multiple properties)
                      </InputLabel>
                      <Select
                        color="primary"
                        MenuProps={{
                          className: classes.selectMenu,
                        }}
                        classes={{
                          select: classes.select,
                        }}
                        value={investmentRange}
                        onChange={investmentRangeChanged}
                        inputProps={{
                          name: "investmentRange",
                          id: "investmentRangeId",
                        }}
                      >
                        <MenuItem
                          disabled
                          classes={{
                            root: classes.selectMenuItem,
                          }}
                        >
                          Investment Range
                        </MenuItem>
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected,
                          }}
                          value="$100,000 - $500,000"
                        >
                          $100,000 - $500,000
                        </MenuItem>
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected,
                          }}
                          value="$500,000 - $1,000,000"
                        >
                          $500,000 - $1,000,000
                        </MenuItem>
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected,
                          }}
                          value="$1,000,000 - $5,000,000"
                        >
                          $1,000,000 - $5,000,000
                        </MenuItem>
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected,
                          }}
                          value="Over $5,000,000"
                        >
                          Over $5,000,000
                        </MenuItem>
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected,
                          }}
                          value="Not Sure"
                        >
                          Not Sure
                        </MenuItem>{" "}
                      </Select>
                    </FormControl>
                    <FormControl
                      fullWidth
                      className={classes.selectFormControl}
                    >
                      <InputLabel
                        htmlFor="financingId"
                        className={classes.selectLabel}
                      >
                        Will you require financing?
                      </InputLabel>
                      <Select
                        MenuProps={{
                          className: classes.selectMenu,
                        }}
                        classes={{
                          select: classes.select,
                        }}
                        value={financing}
                        onChange={financingChanged}
                        inputProps={{
                          name: "financing",
                          id: "financingId",
                        }}
                      >
                        <MenuItem
                          disabled
                          classes={{
                            root: classes.selectMenuItem,
                          }}
                        >
                          Financing
                        </MenuItem>
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected,
                          }}
                          value="No Financing Needed"
                        >
                          No Financing Needed
                        </MenuItem>
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected,
                          }}
                          value="Financing Needed"
                        >
                          Yes, Financing Needed
                        </MenuItem>
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected,
                          }}
                          value="Not Sure"
                        >
                          Not Sure
                        </MenuItem>
                      </Select>
                    </FormControl>
                    <CustomInput
                      labelText="Your comments & preferences (Target state/region, when you plan to invest etc.) "
                      id="messageId"
                      error={msgErr}
                      onChange={messageChanged}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        multiline: true,
                        rows: 6,
                        maxLength: 500,
                        onBlur: messageChanged,
                      }}
                    />
                    <div className={classes.textCenter}>
                      <FormHelperText
                        style={
                          emailErr || phoneErr || msgErr
                            ? {}
                            : { display: "none" }
                        }
                        error={emailErr || phoneErr || msgErr}
                      >
                        Please correct field errors.
                      </FormHelperText>

                      <GridItem
                        lg={12}
                        style={msgSent ? {} : { display: "none" }}
                      >
                        <SnackbarContent
                          message={<span>Thank you for your interest.</span>}
                          color="success"
                        />
                      </GridItem>
                      <Button
                        color="success"
                        onClick={saveInvestorInterest}
                        round
                      >
                        Contact us
                      </Button>
                    </div>
                  </form>
                </GridItem>
              </GridContainer>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </GridContainer>
    </div>
  );
}
