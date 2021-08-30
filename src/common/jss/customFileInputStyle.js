const customFileInputStyle = {
  inputFile: {
    opacity: "0",
    position: "absolute",
    top: "0",
    right: "0",
    bottom: "0",
    left: "0",
    width: "100%",
    height: "100%",
    zIndex: "-1",
  },
  inputFileWrapper: {
    "& button svg": {
      color: "inherit",
    },
  },

  mainRaised: {
    width: "100%",
    zIndex: "12",
    margin: "10px 10px 0px",
    borderRadius: "6px",
  },
};

export default customFileInputStyle;
