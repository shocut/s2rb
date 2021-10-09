/* eslint-disable prettier/prettier */
import React from "react";
// used for making the prop types of this component
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";

// core components
import CustomInput from "./CustomInput.js";
import Button from "./Button.js";
import GridContainer from "./GridContainer.js";
import GridItem from "./GridItem.js";
import styles from "../jss/customFileInputStyle.js";

const useStyles = makeStyles(styles);

export default function S3FileList(props) {
  const { attachments, deleteAttachment, allowDelete, endButton, inputProps, formControlProps, ...rest } = props;

  const classes = useStyles();

  const fileCatgMap = new Map();

  fileCatgMap.set("mortgage_stmt", "Mortgage Statement");
  fileCatgMap.set("identity_proof", "Identity Proof");
  fileCatgMap.set("title_proof", "House Title");
  fileCatgMap.set("home_photo", "Home Photographs");

  function S3FileRow() {
    function getValue(valObj) {
      return fileCatgMap.get(valObj.category) + ": " + valObj.name;
    }
    // eslint-disable-next-line
    return (
      <GridContainer className={classes.mainRaised} {...rest}>
        {attachments.length > 0 && (
          <GridItem xs={12} sm={12} md={12} lg={12}>
            <h5>Documents uploaded:</h5>
          </GridItem>
        )}
        {!attachments ||
          (attachments.length === 0 && (
            <GridItem xs={12} sm={12} md={12} lg={12}>
              <h5>
                Please upload home photos and documents, uploaded documents will
                show-up in the section below.
              </h5>
            </GridItem>
          ))}

        {attachments.map((item) => (
          <GridItem xs={12} sm={12} md={12} lg={12} key={item.name}>
            <FormControl fullWidth>
              <div className={classes.inputFileWrapper}>
                <CustomInput
                  formControlProps={{
                    ...formControlProps,
                  }}
                  inputProps={{
                    ...inputProps,
                    value: getValue(item),
                    endAdornment: (
                      <Button
                        file-name={item.name}
                        file-catg={item.category}
                        round={true}
                        color={allowDelete ? "warning" : "default"}
                        justIcon={true}
                        onClick={allowDelete ? deleteAttachment : null}
                        disabled={allowDelete ? false : true}
                      >
                        {endButton.icon !== undefined ? endButton.icon : null}
                        {endButton.text !== undefined ? endButton.text : null}
                      </Button>
                    ),
                  }}
                />
              </div>
            </FormControl>
          </GridItem>
        ))}
      </GridContainer>
    );
  }

  if (inputProps && inputProps.type && inputProps.type === "file") {
    inputProps.type = "text";
  }

  return (
    <GridContainer>
      <S3FileRow xs={12} sm={12} md={12} lg={12} />
    </GridContainer>
  );
}

S3FileList.defaultProps = {
  multiple: false,
};

S3FileList.propTypes = {
  attachments: PropTypes.array,
  setAttachments: PropTypes.func,
  allowDelete: PropTypes.bool,
  deleteAttachment: PropTypes.func,
  id: PropTypes.string,
  endButton: PropTypes.object,
  startButton: PropTypes.object,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  multiple: PropTypes.bool,
  // it is a function from which you can get the file that was uploaded
  // more can be read here: https://github.com/creativetimofficial/ct-material-kit-pro-react/issues/64 and here: https://github.com/creativetimofficial/ct-material-kit-pro-react/issues/37
  onChange: PropTypes.func,
};
