import React from "react";
import { useState } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

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

import styles from "./contactUsStyle.js";
const useStyles = makeStyles(styles);
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default function ContactUs() {
  const classes = useStyles();
  const [contactFormShow, setContactFormShow] = useState(false);
  const [investmentRange, setInvestmentRange] = useState(false);

  const closeDialog = () => {
    setContactFormShow(false);
  };

  const showContactForm = () => {
    setContactFormShow(true);
  };

  const sendMessage = () => {
    console.log("In SendMessage");
  };

  const investmentRangeChanged = () => {
    console.log("In investmentRangeChanged");
    setInvestmentRange("");
  };

  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem cs={12} sm={12} md={8}>
          <h2 className={classes.title}>Are you a real-estate investor?</h2>
          <h4 className={classes.description}>
            If you are looking for good real estate investment opportunities
            with long term rental income potential please write to us. A S2RB
            representative will contact you with next steps to be part of the
            investor pool.
          </h4>
          <center>
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
            <h4 className={classes.modalTitle}>Investor Profile</h4>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <GridContainer>
                <GridItem lg={12}>
                  <p>
                    You can contact us with anything related to our Products. We
                    {"'"}ll get in touch with you as soon as possible.
                    <br />
                    <br />
                  </p>
                  <form>
                    <CustomInput
                      labelText="Your Name"
                      id="float"
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                    <CustomInput
                      labelText="Email address"
                      id="float"
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                    <CustomInput
                      labelText="Phone"
                      id="float"
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />

                    <FormControl
                      fullWidth
                      className={classes.selectFormControl}
                    >
                      <InputLabel
                        htmlFor="simple-select"
                        className={classes.selectLabel}
                      >
                        Target Investment Range
                      </InputLabel>
                      <Select
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
                          Single Select
                        </MenuItem>
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected,
                          }}
                          value="2"
                        >
                          Paris
                        </MenuItem>
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected,
                          }}
                          value="3"
                        >
                          Bucharest
                        </MenuItem>
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected,
                          }}
                          value="4"
                        >
                          Rome
                        </MenuItem>
                      </Select>
                    </FormControl>
                    <CustomInput
                      labelText="Your message"
                      id="float"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        multiline: true,
                        rows: 6,
                      }}
                    />
                    <div className={classes.textCenter}>
                      <Button color="primary" onClick={sendMessage} round>
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
