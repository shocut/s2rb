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
                S2RB is a platform and service that works with you (seller) and
                potential real-estate investors (buyer) to provide an
                opportunity where you can stay in your home even after selling
                it. We provide real-estate investors opportunities to invest in
                good properties that can be rented back to former owners.
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
                S2RB works closely with realtors, investors, mortgage bankers
                etc. to ensure you can meet your real estate goals. We verify
                your property information, facilitate terms with investors,
                bankers and create an investment package. The investors and
                real-estate professionals pay S2RB transaction and lead
                generation fees for this service so it is completely free to you
                the seller. S2RB does not represent buyers or sellers, it
                provides a platform where goals of both can be met.
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
                We facilitate sharing of property information with multiple
                potential investors. The investors (buyers) and you (seller)
                determine the property value based on professional real-estate
                assessors and automated valuation techniques. Unlike traditional
                home sale transactions you plan to occupy the house even after
                the sale, so the potential buyers are limited to folks who want
                to buy the property as an investment rather than as their next
                home. Registering with S2RB is not the same as listing on MLS,
                it simply enables us to find investors for your property.
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
                <b>Can I buy the house back in future?</b>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Yes you can. S2RB facilitates terms that include an option to
                buy the house back. Our team of real estate lawyers and realtors
                have created provisions that enable a {'"'}First right of
                refusal{'" '}
                when the home to be sold again. This can be part of the terms
                negotiated up-front when selling your house. Simply put, if the
                investors plan to sell, they can give you the first right to buy
                the house back. Since all situations are unique, the period,
                price, terms can vary but if you wish to buy it back, you will
                have that opportunity.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </GridItem>
      </GridContainer>
    </div>
  );
}
