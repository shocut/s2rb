/* eslint-disable prettier/prettier */
import React from "react";
import { useState } from "react";

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
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";

import styles from "../jss/customFileInputStyle.js";

const useStyles = makeStyles(styles);
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default function S3FileHandler(props) {
  const {
    attachments,
    maxFileSize,
    setAndSaveAttachments,
    allowDelete,
    id,
    endButton,
    startButton,
    inputProps,
    formControlProps,
    multiple,
    ...rest
  } = props;

  const [fileName, setFileName] = useState("");
  const [fileCategory, setFileCategory] = useState("home_photo");
  const [catgError, setCatgError] = useState(false);
  const [fileError, setFileError] = useState(
    "Please select a document type before attaching file."
  );
  const [fileObj, setFileObj] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState("false");
  const [classicModal, setClassicModal] = useState(false);
  const [delFileObj, setDelFileObj] = useState({ fileName: "", fileCatg: "" });
  const [confirmUpload, setConfirmUpload] = useState(false);

  const closeDialog = () => {
    setClassicModal(false);
    setConfirmUpload(false);
    setFileName("");
  };

  // eslint-disable-next-line
  const [files, setFiles] = React.useState(null);
  let hiddenFile = React.createRef();
  const onFocus = (e) => {
    if (fileCategory == "") {
      setFileError("Please select a document type before attaching file.");
      setCatgError(true);
      return false;
    } else {
      setCatgError(false);
      setProgress(0);
      hiddenFile.current.click(e);
    }
  };

  const handleFileCategory = (event) => {
    setCatgError(false);
    setFileCategory(event.target.value);
    var inputEle = document.getElementById("inputFile");
    if (inputEle) {
      if (event.target.value === "home_photo") {
        inputEle.setAttribute(
          "accept",
          "image/png, image/gif, image/jpeg, , image/jpg"
        );
      } else {
        inputEle.removeAttribute("accept");
      }
    }
  };

  // eslint-disable-next-line
  const handleSubmit = (e) => {
    e.preventDefault();
    // files is the file/image uploaded
    // in this function you can save the image (files) on form submit
    // you have to call it yourself
  };

  /*eslint-disable*/
  const deleteAttachment = (evt) => {
    var delFileName = evt.currentTarget.getAttribute("file-name");
    var delFileCatg = evt.currentTarget.getAttribute("file-catg");
    setDelFileObj({ fileName: delFileName, fileCatg: delFileCatg });
    setClassicModal(true);
  };
  /*eslint-disable*/

  const deleteAttachmentConfirmed = (evt) => {
    try {
      closeDialog();
      var indx = findAttachmentIndx(delFileObj.fileName, delFileObj.fileCatg);
      console.log(indx);
      setDelFileObj({ fileName: "", fileCatg: "" }); //clean-up
      if (indx > -1) {
        console.log("index of attch to delete: " + indx);
        var newAttachments = attachments.slice();
        newAttachments.splice(indx, 1);
        setAndSaveAttachments(newAttachments);
        console.log(newAttachments);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const addAttachment = (attchObj) => {
    try {
      if (findAttachmentIndx(attchObj.name, attchObj.category) > -1) {
        return false; //already there
      }
      //this is a new file
      var newAttachments = attachments.slice();
      newAttachments.push(attchObj);
      setAndSaveAttachments(newAttachments);
    } catch (e) {
      console.log(e);
    }
  };

  function findAttachmentIndx(fileName, fileCatg) {
    console.log("fileName: " + fileName + " fileCatg:" + fileCatg);
    try {
      if (attachments && attachments.length > 0) {
        for (let i = 0; i < attachments.length; i++) {
          if (
            attachments[i].name === fileName &&
            attachments[i].category === fileCatg
          ) {
            // the file & category is in collection
            return i;
          }
        }
        return -1;
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function uploadFile(e) {
    const file = e.currentTarget.files[0];
    if (!file) return false;
    if (file.size > maxFileSize) {
      setFileError(
        "The size of file selected was too large. Please breakdown into smaller files to upload."
      );
      setCatgError(true);
      setTimeout(() => {
        setFileObj(null);
        setCatgError(false);
      }, 10000);
      return false;
    } else {
      setCatgError(false);
    }
    setFileName(file.name);
    setFileObj(file);
    setConfirmUpload(true);
  }

  async function confirmedUploadFile() {
    const file = fileObj;
    if (!file) return false;

    setIsVisible("true");
    try {
      var userEmail = "";
      var currentUser = localStorage.getItem("currentUser");
      if (currentUser) {
        var userObj = JSON.parse(currentUser);
        userEmail = userObj.attributes.email;
      }
      var s3FileName = fileCategory + "_" + file.name;
      const result = await Storage.put(s3FileName, file, {
        level: "protected",
        identityId: userObj.username,
        contentDisposition: "attachment",
        progressCallback(loadProgress) {
          setProgress((loadProgress.loaded / loadProgress.total) * 100);
          if (loadProgress.total - loadProgress.loaded < 1) {
            setFileName("");
            setTimeout(() => {
              setIsVisible("false");
              setFileObj(null);
              setConfirmUpload(false);
            }, 2000);
          }
        },
        metadata: { fileCategory: fileCategory, userEmail: userEmail },
      });
      console.log(result, result.key);
      if (result) {
        var attachment = new Attachment({
          name: file.name,
          category: fileCategory,
          fileKey: result.key,
          status: "active",
        });
        addAttachment(attachment);
      }
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

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
    <div>
      <GridContainer {...rest}>
        <GridItem xs={12} sm={12} md={12} lg={12}></GridItem>
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
                classes={{
                  root: classes.selectMenuItem,
                  selected: classes.selectMenuItemSelected,
                }}
                value="home_photo"
              >
                Home Photographs
              </MenuItem>
              <MenuItem
                classes={{
                  root: classes.selectMenuItem,
                  selected: classes.selectMenuItemSelected,
                }}
                value="mortgage_stmt"
              >
                Other Documents (e.g. Mortgage Statement)
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
                id="inputFile"
                multiple={multiple}
                accept="image/png, image/gif, image/jpeg, , image/jpg"
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
                  onClick: onFocus,
                  error: catgError,
                  value: fileName,
                  endAdornment: buttonEnd,
                  startAdornment: buttonStart,
                  ...inputProps,
                }}
              />
            </div>
            <FormHelperText
              style={catgError ? {} : { display: "none" }}
              error={catgError}
            >
              {fileError}
            </FormHelperText>
          </FormControl>
        </GridItem>
        <GridItem xs={12} sm={12} md={12} lg={12}>
          <S3FileList
            attachments={attachments}
            deleteAttachment={deleteAttachment}
            allowDelete={allowDelete}
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
          className={classes.modalHeader}
        >
          <div className={classes.modalTitle}>
            Remove this document attachment?
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Please confirm if you want to remove this attachment.{" "}
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.modalFooter}>
          <Button color="warning" onClick={deleteAttachmentConfirmed}>
            Remove
          </Button>
          <Button color="info" onClick={closeDialog}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        classes={{
          root: classes.center,
          paper: classes.modal,
        }}
        open={confirmUpload}
        keepMounted
        TransitionComponent={Transition}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          id="alert-dialog-slide-title"
          className={classes.modalHeader}
        >
          <div className={classes.modalTitle}>Upload Attachment</div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Please confirm that you want to upload file: <b>{fileName}</b>
          </DialogContentText>
          <CustomLinearProgressWithLabel
            variant="determinate"
            isVisible={isVisible}
            color="success"
            value={progress}
            style={{ width: "100%", display: "inline-block" }}
          />
        </DialogContent>
        <DialogActions className={classes.modalFooter}>
          <Button color="success" onClick={confirmedUploadFile}>
            Upload File
          </Button>
          <Button color="info" onClick={closeDialog}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

S3FileHandler.defaultProps = {
  multiple: false,
};

S3FileHandler.propTypes = {
  attachments: PropTypes.array,
  setAndSaveAttachments: PropTypes.func,
  allowDelete: PropTypes.bool,
  id: PropTypes.string,
  maxFileSize: PropTypes.number,
  endButton: PropTypes.object,
  startButton: PropTypes.object,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  multiple: PropTypes.bool,
  onChange: PropTypes.func,
};
