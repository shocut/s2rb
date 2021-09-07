import {
  container,
  title,
  main,
  mainRaised,
  mlAuto,
  description,
  grayColor,
} from "../common/jss/baseStyles.js";

const contactUsStyle = {
  main,
  mainRaised,
  title,
  mlAuto,
  description,
  container: {
    ...container,
    maxWidth: "970px !important",
  },
  contactContent: {
    paddingBottom: "40px",
    paddingTop: "40px",
  },
  bigMap: {
    height: "55vh",
    maxHeight: "550px",
    width: "100%",
    display: "block",
  },
  info: {
    paddingBottom: "10px",
    paddingTop: 0,
  },
  textCenter: {
    textAlign: "center !important",
  },
  block: {
    color: "inherit",
    padding: "0.9375rem",
    fontWeight: "500",
    fontSize: "12px",
    textTransform: "uppercase",
    borderRadius: "3px",
    textDecoration: "none",
    position: "relative",
    display: "block",
  },
  inlineBlock: {
    display: "inline-block",
    padding: "0px",
    width: "auto",
  },
  list: {
    marginBottom: "0",
    padding: "0",
    marginTop: "0",
  },
  left: {
    float: "left!important",
    display: "block",
  },
  right: {
    padding: "15px 0",
    margin: "0",
    float: "right",
  },
  icon: {
    width: "18px",
    height: "18px",
    top: "3px",
    position: "relative",
  },
  selectLabel: {
    fontSize: "14px",
    color: grayColor[12],
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    lineHeight: "1.42857",
  },
};

export default contactUsStyle;
