import {
  container,
  title,
  cardTitle,
  main,
  mrAuto,
  whiteColor,
  grayColor,
  mlAuto,
} from "../common/jss/baseStyles.js";

import buttonGroup from "../common/jss/buttonGroupStyle.js";
import tooltips from "../common/jss/tooltipsStyle.js";

const styles = {
  main,
  mrAuto,
  mlAuto,
  cardTitle,
  ...buttonGroup,
  ...tooltips,
  container: {
    ...container,
    zIndex: 1,
  },
  title: {
    ...title,
    "&, & + h4": {
      color: whiteColor,
    },
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
  imgContainer: {
    width: "150px",
    maxHeight: "200px",
    overflow: "hidden",
    display: "block",
    "& img": {
      width: "100%",
    },
    fontSize: "7em",
    color: "#E5E4E2",
  },
  description: {
    maxWidth: "150px",
  },
  tdName: {
    minWidth: "200px",
    fontWeight: "400",
    fontSize: "1.5em",
  },
  tdNameAnchor: {
    color: grayColor[1],
    fontSize: "1em",
  },
  tdNameSmall: {
    color: grayColor[0],
    fontSize: "0.75em",
    fontWeight: "300",
  },
  tdNumber: {
    textAlign: "right",
    minWidth: "150px",
    fontWeight: "300",
    fontSize: "1.125em !important",
  },
  tdNumberSmall: {
    marginRight: "3px",
  },
  tdNumberAndButtonGroup: {
    lineHeight: "1 !important",
    "& svg,& .fab,& .fas,& .far,& .fal,& .material-icons": {
      marginRight: "0",
    },
  },
  customFont: {
    fontSize: "16px !important",
  },
  actionButton: {
    margin: "0px",
    padding: "5px",
  },
  textCenter: {
    textAlign: "center",
  },
  textRight: {
    textAlign: "right",
  },
  mainRaised: {
    margin: "-20px 10px 0px",
    height: "100%",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
  },
  thumbNail: {
    width: "120px",
    height: "120px",
  },
  docButton: {
    cursor: "pointer",
    padding: "5px",
    borderRadius: "6px",
    boxShadow:
      "0 8px 12px 1px rgba(0, 0, 0, 0.14), 0 3px 15px 2px rgba(0, 0, 0, 0.12), 0 4px 5px -2px rgba(0, 0, 0, 0.2)",
  },
  tableCell: {
    borderTop: "1px solid " + grayColor[6],
    padding: "5px",
  },
};

export default styles;