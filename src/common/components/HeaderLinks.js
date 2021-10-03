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
  const shareTitle = "Check out Sell to Rent Back (S2RB) that is solving your housing needs post foreclosure.";
  const summary = "Sell to Rent Back (S2RB) helps home owners stay " +
                "in their home when facing foreclosure. " +
                "Learn more at https://www.s2rb.com";
  const socialTags = ['s2rb', 'sell2rent'];
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
              <Link to="/app/sdashboard" className={classes.dropdownLink}>
                <DashboardIcon className={classes.dropdownIcons} />
                Dashboard
              </Link>,
              <Link
                to="/app/sdashboard"
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
              id="sb-facebook"
              title="Share on Facebook"
              placement={window.innerWidth > 959 ? "top" : "left"}
              classes={{ tooltip: classes.tooltip }}
            >
             <div>
              <FacebookShareButton url={shareUrl} quote={shareTitle} hashtag={socialTags}>
                <FacebookIcon size={32} round />
              </FacebookShareButton>
             </div>
            </Tooltip>,
            <Tooltip
              id="sb-linkedin"
              title="Share on LinkedIn"
              placement={window.innerWidth > 959 ? "top" : "left"}
              classes={{ tooltip: classes.tooltip }}
            >
             <div>
              <LinkedinShareButton url={shareUrl}>
                <LinkedinIcon size={32} round />
              </LinkedinShareButton>
             </div>
            </Tooltip>,
            <Tooltip
              id="sb-twitter"
              title="Share on Twitter"
              placement={window.innerWidth > 959 ? "top" : "left"}
              classes={{ tooltip: classes.tooltip }}
            >
              <div>
                <TwitterShareButton url={shareUrl} title={shareTitle} hashtags={socialTags}>
                <TwitterIcon size={32} round />
                </TwitterShareButton>
              </div>
            </Tooltip>,
            // TODO:Add pintrest once we have a sharing image ready of size 735x1102.
            ]}
        />
      </ListItem>
    </List>
  );
}
