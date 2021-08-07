/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// material-ui core components
import { List, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import styles from "../jss/footerStyle.js";

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  const { whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont,
  });
  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont,
  });
  return (
    <footer className={footerClasses}>
      <div className={classes.container}>
        <div className={classes.disclaimer}>
          <b>Legal Notice and Disclosures</b>
          <br />
          S2RB free platform services will be available only via web or mobile
          devices through completing our online application. S2RB communications
          and communications emanating from its social media community are for
          informational purposes only and are not intended as an offer or
          solicitation for the offer of any debt resolution services or outcome
          or as an official confirmation of any services or transactions. The
          S2RB website provides its users links to social media sites and email.
          The linked social media and email messages are pre-populated. However,
          these messages can be deleted or edited by S2RB users, who are under
          no obligation to send any pre-populated messages. All services, data
          and other information available through S2RB are not warranted as to
          completeness or accuracy and are subject to change without notice.
          Note that certain S2RB product features listed are currently in
          development and will be available soon.
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  whiteFont: PropTypes.bool,
};
