/* eslint-disable */
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
};

export default styles;
