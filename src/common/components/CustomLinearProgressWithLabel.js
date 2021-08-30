import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import styles from "../jss/customLinearProgressStyle.js";

const useStyles = makeStyles(styles);

export default function CustomLinearProgressWithLabel(props) {
  const { color, isVisible, ...rest } = props;
  const classes = useStyles();

  return (
    <Box display={isVisible === "true" ? "flex" : "none"} alignItems="center">
      <Box width="90%" mr={1}>
        <LinearProgress
          variant="determinate"
          {...rest}
          classes={{
            root: classes.root + " " + classes[color + "Background"],
            bar: classes.bar + " " + classes[color],
          }}
        />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

CustomLinearProgressWithLabel.defaultProps = {
  color: "gray",
  value: "0",
  isVisible: "false",
};

CustomLinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
  isVisible: PropTypes.string,
  color: PropTypes.oneOf([
    "primary",
    "warning",
    "danger",
    "success",
    "info",
    "rose",
    "gray",
  ]),
};
