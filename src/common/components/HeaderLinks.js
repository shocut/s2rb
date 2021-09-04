/*eslint-disable*/
import React from "react";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

// core components
import CustomDropdown from "./CustomDropdown.js";
import Button from "./Button.js";
import styles from "../jss/headerLinksStyle.js";
import LoginButton from "./LoginButton";

const useStyles = makeStyles(styles);

export default function HeaderLinks({ onLogout }) {
  const classes = useStyles();
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <LoginButton onLogout={onLogout} classes={classes} />
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="sb-facebook"
          title="Share on facebook"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.facebook.com/S2RB?ref=s2rb"
            target="_blank"
            className={classes.navLink}
          >
            <FacebookIcon className={classes.socialIcons} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="sb-twitter"
          title="Share on Twitter"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.twitter.com/S2RB?ref=s2rb"
            target="_blank"
            className={classes.navLink}
          >
            <TwitterIcon className={classes.socialIcons} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="sb-twitter"
          title="Share on LinkedIn"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.linkedin.com/S2RB?ref=s2rb"
            target="_blank"
            className={classes.navLink}
          >
            <LinkedInIcon className={classes.socialIcons} />
          </Button>
        </Tooltip>
      </ListItem>
    </List>
  );
}
