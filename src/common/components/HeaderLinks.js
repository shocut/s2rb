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

import Icon from "@material-ui/core/Icon";
import ShareIcon from "@material-ui/icons/Share";
import PersonIcon from "@material-ui/icons/Person";
import DashboardIcon from "@material-ui/icons/Dashboard";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";

import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  RedditShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

import {
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  InstapaperIcon,
  LinkedinIcon,
  PinterestIcon,
  RedditIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

// core components
import CustomDropdown from "./CustomDropdown.js";
import Button from "./Button.js";
import styles from "../jss/headerLinksStyle.js";
import { successColor } from "../jss/baseStyles.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const shareUrl = "https://www.s2rb.com";
  const shareTitle = "Check out this Sell to Rent Back (S2RB) platform.";
  const { onLogout, dropdownHoverColor, ...rest } = props;
  const classes = useStyles();
  const currentUser = localStorage.getItem("currentUser");

  return (
    <List className={classes.list + " " + classes.mlAuto}>
      {!currentUser && (
        <ListItem className={classes.listItem}>
          <Button
            color="transparent"
            href="/signup"
            target="_self"
            className={classes.navLink}
          >
            Sign in
          </Button>
        </ListItem>
      )}
      {currentUser && (
        <ListItem className={classes.listItem}>
          <CustomDropdown
            noLiPadding
            navDropdown
            hoverColor="gray"
            caret={false}
            buttonProps={{
              justIcon: true,
              color: "transparent",
            }}
            buttonIcon={PersonIcon}
            dropdownList={[
              <Link to="/sdashboard" className={classes.dropdownLink}>
                <DashboardIcon className={classes.dropdownIcons} />
                Dashboard
              </Link>,
              <Link
                to="/sdashboard"
                className={classes.dropdownLink}
                onClick={onLogout}
              >
                <ExitToAppIcon className={classes.dropdownIcons} /> Sign Out
              </Link>,
            ]}
          />
        </ListItem>
      )}
      <ListItem className={classes.listItem}>
        <CustomDropdown
          hoverColor="gray"
          caret={false}
          buttonProps={{
            justIcon: true,
            color: "transparent",
          }}
          buttonIcon={ShareIcon}
          dropdownList={[
            <Tooltip
              id="sb-twitter"
              title="Share on Facebook"
              placement={window.innerWidth > 959 ? "top" : "left"}
              classes={{ tooltip: classes.tooltip }}
            >
              <FacebookShareButton url={shareUrl} quote={shareTitle}>
                <FacebookIcon size={32} round />
              </FacebookShareButton>
            </Tooltip>,
            <Tooltip
              id="sb-twitter"
              title="Share on LinkedIn"
              placement={window.innerWidth > 959 ? "top" : "left"}
              classes={{ tooltip: classes.tooltip }}
            >
              <LinkedinShareButton url={shareUrl} quote={shareTitle}>
                <LinkedinIcon size={32} round />
              </LinkedinShareButton>
            </Tooltip>,
            <Tooltip
              id="sb-twitter"
              title="Share on Twitter"
              placement={window.innerWidth > 959 ? "top" : "left"}
              classes={{ tooltip: classes.tooltip }}
            >
              <TwitterShareButton url={shareUrl} quote={shareTitle}>
                <TwitterIcon size={32} round />
              </TwitterShareButton>
            </Tooltip>,
            <Tooltip
              id="sb-twitter"
              title="Share on Pinterest"
              placement={window.innerWidth > 959 ? "top" : "left"}
              classes={{ tooltip: classes.tooltip }}
            >
              <PinterestShareButton url={shareUrl} quote={shareTitle}>
                <PinterestIcon size={32} round />
              </PinterestShareButton>
            </Tooltip>,
            <Tooltip
              id="sb-twitter"
              title="Share via Email"
              placement={window.innerWidth > 959 ? "top" : "left"}
              classes={{ tooltip: classes.tooltip }}
            >
              <EmailShareButton url={shareUrl} quote={shareTitle}>
                <EmailIcon size={32} round />
              </EmailShareButton>
            </Tooltip>,
          ]}
        />
      </ListItem>
    </List>
  );
}
