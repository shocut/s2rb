/* eslint-disable prettier/prettier */
import React from "react";

import { Storage } from "aws-amplify";
import { Attachment } from "../../models";

// used for making the prop types of this component
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

// core components
import CustomInput from "./CustomInput.js";
import Button from "./Button.js";
import GridContainer from "./GridContainer.js";
import GridItem from "./GridItem.js";
import CustomLinearProgressWithLabel from "./CustomLinearProgressWithLabel.js";
import S3FileList from "./S3FileList.js";
import DeleteIcon from "@material-ui/icons/Delete";

import styles from "../jss/customFileInputStyle.js";

const useStyles = makeStyles(styles);

export default function CustomFileInput(props) {
  const { attachments, setAttachments, saveToDataStore, ...rest } = props;

  const [fileName, setFileName] = React.useState("");
  const [fileCategory, setFileCategory] = React.useState("");
  const [catgError, setCatgError] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState("false");

  // eslint-disable-next-line
  const [files, setFiles] = React.useState(null);
  let hiddenFile = React.createRef();
  const onFocus = (e) => {
    if (fileCategory == "") {
      //alert("Please select a category");
      setCatgError(true);
      return false;
    } else {
      setCatgError(false);
      setProgress(0);
      setIsVisible("true");
      hiddenFile.current.click(e);
    }
  };

  const handleFileCategory = (event) => {
    setCatgError(false);
    setFileCategory(event.target.value);
  };

  // eslint-disable-next-line
  const handleSubmit = (e) => {
    e.preventDefault();
    // files is the file/image uploaded
    // in this function you can save the image (files) on form submit
    // you have to call it yourself
  };

  const addAttachment = (attchObj) => {
    try {
      if (attachments && attachments.length > 0) {
        for (let i = 0; i < attachments.length; i++) {
          if (
            attachments[i].name === attchObj.name &&
            attachments[i].category === attchObj.category
          ) {
            // the file & category is in collection
            return false;
          }
        }
      }
      //this is a new file
      var newAttachments = attachments.slice();
      newAttachments.push(attchObj);
      setAttachments(newAttachments);
      console.log(newAttachments);
    } catch (e) {
      console.log(e);
    }
  };

  async function uploadFile(e) {
    const file = e.target.files[0];
    setFileName(file.name);
    console.log(e);

    try {
      var userEmail = "";
      var currentUser = localStorage.getItem("currentUser");
      if (currentUser) {
        var userObj = JSON.parse(currentUser);
        userEmail = userObj.attributes.email;
      }
      const result = await Storage.put(file.name, file, {
        level: "private",
        contentDisposition: "attachment",
        progressCallback(loadProgress) {
          setProgress((loadProgress.loaded / loadProgress.total) * 100);
          if (loadProgress.total - loadProgress.total < 1) {
            setFileName("");
            setTimeout(() => {
              setIsVisible("false");
            }, 3000);

            var attachment = new Attachment({
              name: file.name,
              category: fileCategory,
              fileURL: file.name,
              status: "active",
            });
            addAttachment(attachment);
            saveToDataStore();
          }
        },
        metadata: { fileCategory: fileCategory, userEmail: userEmail },
      });
      console.log(result);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  const { id, endButton, startButton, inputProps, formControlProps, multiple } =
    props;
  const classes = useStyles();
  if (inputProps && inputProps.type && inputProps.type === "file") {
    inputProps.type = "text";
  }
  let buttonStart;
  let buttonEnd;
  if (startButton) {
    buttonStart = (
      <Button {...startButton.buttonProps}>
        {startButton.icon !== undefined ? startButton.icon : null}
        {startButton.text !== undefined ? startButton.text : null}
      </Button>
    );
  }
  if (endButton) {
    buttonEnd = (
      <Button {...endButton.buttonProps}>
        {endButton.icon !== undefined ? endButton.icon : null}
        {endButton.text !== undefined ? endButton.text : null}
      </Button>
    );
  }
  return (
    <GridContainer {...rest}>
      <GridItem xs={12} sm={12} md={12} lg={12}>
        <CustomLinearProgressWithLabel
          variant="determinate"
          isVisible={isVisible}
          color="success"
          value={progress}
          style={{ width: "100%", display: "inline-block" }}
        />
      </GridItem>
      <GridItem xs={12} sm={12} md={12} lg={12}>
        <FormControl fullWidth className={classes.selectFormControl}>
          <InputLabel htmlFor="simple-select" className={classes.selectLabel}>
            Document Type *
          </InputLabel>
          <Select
            error={catgError}
            MenuProps={{
              className: classes.selectMenu,
            }}
            classes={{
              select: classes.select,
            }}
            value={fileCategory}
            onChange={handleFileCategory}
            inputProps={{
              name: "catgSelect",
              id: "catgSelectId",
            }}
          >
            <MenuItem
              disabled
              classes={{
                root: classes.selectMenuItem,
              }}
            >
              Select Document Type
            </MenuItem>
            <MenuItem
              classes={{
                root: classes.selectMenuItem,
                selected: classes.selectMenuItemSelected,
              }}
              value="Mortgage Statement"
            >
              Mortgage Statement
            </MenuItem>
            <MenuItem
              classes={{
                root: classes.selectMenuItem,
                selected: classes.selectMenuItemSelected,
              }}
              value="Identity Proof"
            >
              Identity Proof
            </MenuItem>
            <MenuItem
              classes={{
                root: classes.selectMenuItem,
                selected: classes.selectMenuItemSelected,
              }}
              value="House Title"
            >
              House Title
            </MenuItem>
            <MenuItem
              classes={{
                root: classes.selectMenuItem,
                selected: classes.selectMenuItemSelected,
              }}
              value="Home Photographs"
            >
              Home Photographs
            </MenuItem>
          </Select>
        </FormControl>
      </GridItem>
      <GridItem xs={12} sm={12} md={12} lg={12}>
        <FormControl fullWidth className={classes.selectFormControl}>
          <div className={classes.inputFileWrapper}>
            <input
              type="file"
              className={classes.inputFile}
              multiple={multiple}
              ref={hiddenFile}
              onChange={uploadFile}
            />
            <CustomInput
              id={id}
              error={catgError}
              formControlProps={{
                ...formControlProps,
              }}
              inputProps={{
                ...inputProps,
                onClick: onFocus,
                error: catgError,
                value: fileName,
                endAdornment: buttonEnd,
                startAdornment: buttonStart,
              }}
            />
          </div>
          <FormHelperText
            style={catgError ? {} : { display: "none" }}
            error={catgError}
          >
            Please select a document type before attaching file.
          </FormHelperText>
        </FormControl>
      </GridItem>
      <GridItem xs={12} sm={12} md={12} lg={12}>
        <S3FileList
          attachments={attachments}
          setAttachments={setAttachments}
          formControlProps={{
            fullWidth: true,
            disabled: true,
          }}
          inputProps={{
            placeholder: "File name",
          }}
          endButton={{
            buttonProps: {
              round: true,
              color: "warning",
              justIcon: true,
              fileButton: true,
            },
            icon: <DeleteIcon />,
          }}
        />
      </GridItem>
    </GridContainer>
  );
}

CustomFileInput.defaultProps = {
  multiple: false,
};

CustomFileInput.propTypes = {
  attachments: PropTypes.array,
  setAttachments: PropTypes.func,
  saveToDataStore: PropTypes.func,
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
