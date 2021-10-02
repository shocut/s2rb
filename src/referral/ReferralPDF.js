/* eslint-disable */
import React from "react";
import { Page, Document, Image, StyleSheet } from "@react-pdf/renderer";

import ReferralTitle from "./ReferralTitle";
import ReferralNo from "./ReferralNumber";
import ReferralSection from "./ReferralSection";
import logo from "../common/img/s2rb_logo.jpg";
import ReferralAgreementSection from "./ReferralAgreementSection";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    paddingTop: 30,
    paddingLeft: 30,
    paddingRight: 30,
    lineHeight: 1.5,
    flexDirection: "column",
  },
  logo: {
    height: 15,
    width: 55,
    marginLeft: "10",
    paddingRight: 5,
  },
});

const ReferralPDF = ({ referral }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Image style={styles.logo} src={logo} />
      <ReferralTitle title="S2RB Agent Referral Form" />
      <ReferralNo referral={referral} />
      <ReferralSection referralSection={referral.agentSection} />
      <ReferralSection referralSection={referral.clientSection} />
      <ReferralSection referralSection={referral.clientPropertySection} />
      <ReferralAgreementSection referral={referral} />
    </Page>
  </Document>
);

export default ReferralPDF;
