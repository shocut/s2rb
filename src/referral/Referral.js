/* eslint-disable */
import React, { Fragment } from "react";
import { StyleSheet, PDFViewer } from "@react-pdf/renderer";
import ReferralPDF from "./ReferralPDF";
import referralTemplateData from "./ReferralTemplateData.js";

const Referral = () => {
  var referral = Object.assign(
    referralTemplateData.get("VA"),
    referralTemplateData.get("clientSection"),
    referralTemplateData.get("agreementSection")
  );
  console.log(referral);

  return (
    <Fragment>
      <PDFViewer width="1000" height="600" className="app">
        <ReferralPDF referral={referral} />
      </PDFViewer>
    </Fragment>

    /*
    <PDFDownloadLink
      document={<ReferralPDF referralData={referralObj} />}
      fileName={"Referral.pdf"}
    >
      {({ blob, url, loading, error }) =>
        loading ? "Report loading..." : "Report ready to download"
      }
    </PDFDownloadLink>

    */
  );
};

export default Referral;
