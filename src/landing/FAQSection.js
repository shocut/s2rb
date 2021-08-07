import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// @material-ui/icons

// core components
import GridContainer from "../common/components/GridContainer.js";
import GridItem from "../common/components/GridItem.js";
import styles from "./workStyle.js";

const useStyles = makeStyles(styles);

export default function FAQSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem cs={12} sm={12} md={8}>
          <h2 className={classes.title}>Frequently Asked Questions</h2>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                <b>What is S2RB?</b>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                S2RB is a FREE service that works directly with you and
                potential real-estate investors to provide a path where you can
                get mortgage debt free.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>
                <b>How can S2RB provide this service for free?</b>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                S2RB works closely with a group of real estate professionals
                including realtors, investors, mortgage bankers etc. to ensure
                you can meet your goal of getting debt free. We verify your
                financial information, negotiate with your lenders, and create
                an investment package. The real-estate professionals and
                investors pay S2RB transaction and lead generation fees for this
                service so it is completely free to you.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>
                <b>
                  How do I know I will get the best price for my house? Do you
                  bypass the traditional method of listing on MLS?
                </b>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                S2RB works with a team of realors who can advice you on the best
                strategy for getting market price for your house. Since unlike
                traditional home sales, you plan to occupy the house after the
                sale, the potential buyers are limited to folks who want to buy
                the property as an investment rather than as their next home.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>
                <b>
                  What if the investor wants to sell the house after two years
                  and I want to continue living here?
                </b>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Our team of real estate lawyers and realtors will help you
                negotiate terms up front where you can have the right of first
                refusal on a future sale. Simply put, if the investors plan to
                sell, they can give you the first right to buy the house back.
                Since all situations are unique, the period, price, terms can
                vary but if you wish to buy it back, we will ensure that you
                have that opportunity.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </GridItem>
      </GridContainer>
    </div>
  );
}
