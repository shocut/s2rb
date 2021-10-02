/* eslint-disable */
import React, { Fragment } from "react";
import { StyleSheet, PDFViewer } from "@react-pdf/renderer";
import ReferralPDF from "./ReferralPDF";

const Referral = () => {
  const referral = {
    id: "5df3180a09ea16dc4b95f910",
    referral_no: "201906-28",
    balance: "$2,283.74",
    company: "MANTRIX",
    email: "susanafuentes@mantrix.com",
    phone: "+1 (872) 588-3809",
    address: "922 Campus Road, Drytown, Wisconsin, 1986",
    trans_date: "2019-09-12",
    due_date: "2019-10-12",
    agentSection: {
      sectionTitle: "Receiving and Sending Agent Information",
      items: [
        {
          label1: "Receving Agent:",
          label2: "Sending Agent:",
          val1: "RE/MAX Premier",
          val2: "S2RB Brokerage Inc.",
        },
        {
          label1: "Office Name:",
          label2: "Office Name:",
          val1: "some val",
          val2: "S2RB Brokerage",
        },
        {
          label1: "Address:",
          label2: "Address:",
          val1: "44675 Cape Court, #110",
          val2: "23113 Red Admiral Pl.",
        },
        {
          label1: "City:",
          label2: "City:",
          val1: "Ashburn",
          val2: "Brambleton",
        },
        {
          label1: "State/Prov, Zip/PC:",
          label2: "State/Prov, Zip/PC:",
          val1: "VA, 20147",
          val2: "VA, 20148",
        },
        {
          label1: "Country:",
          label2: "Country:",
          val1: "USA",
          val2: "USA",
        },
        {
          label1: "E-mail:",
          label2: "E-mail:",
          val1: "",
          val2: "support@s2rb.com",
        },
        {
          label1: "Primary Phone:",
          label2: "Primary Phone:",
          val1: "",
          val2: "",
        },
        {
          label1: "Cell Phone:",
          label2: "Cell Phone:",
          val1: "USA",
          val2: "USA",
        },
        {
          label1: "Fax Number:",
          label2: "Fax Number:",
          val1: "",
          val2: "",
        },
      ],
    },
    clientSection: {
      sectionTitle: "Client Information",
      items: [
        {
          label1: "Name:",
          label2: "Home Phone:",
          val1: "some val",
          val2: "some val",
        },
        {
          label1: "Current Address:",
          label2: "Work Phone:",
          val1: "some val",
          val2: "some val",
        },
        {
          label1: "City:",
          label2: "Cell Phone:",
          val1: "some val",
          val2: "some val",
        },
        {
          label1: "State/Prov, Zip/PC:",
          label2: "E-Mail:",
          val1: "",
          val2: "",
        },
        {
          label1: "Country:",
          label2: "Expected Sell Date:",
          val1: "USA",
          val2: "",
        },
        {
          label1: "Additional Information:",
          label2: "Expected Rent Back:",
          val1: "",
          val2: "",
        },
      ],
    },
    clientPropertySection: {
      sectionTitle: "Current Property Information",
      items: [
        {
          label1: "Client is a:",
          label2: "Estimated Price:",
          val1: "Seller",
          val2: "N/A",
        },
        {
          label1: "Home Style:",
          label2: "Bedrooms:",
          val1: "some val",
          val2: "some val",
        },
        {
          label1: "Reason for selling:",
          label2: "Bathrooms:",
          val1: "some val",
          val2: "some val",
        },
      ],
    },
    items: [
      {
        sno: 1,
        label1: "Agent Name:",
        label2: "Agent Name:",
        val1: "some val",
        val2: "some val",
      },
      {
        sno: 1,
        label1: "Agent Name:",
        label2: "Agent Name:",
        val1: "some val",
        val2: "some val",
      },
      {
        sno: 1,
        label1: "Agent Name:",
        label2: "Agent Name:",
        val1: "some val",
        val2: "some val",
      },
      {
        sno: 1,
        label1: "Agent Name:",
        label2: "Agent Name:",
        val1: "some val",
        val2: "some val",
      },
      {
        sno: 1,
        label1: "Agent Name:",
        label2: "Agent Name:",
        val1: "some val",
        val2: "some val",
      },
      {
        sno: 1,
        label1: "Agent Name:",
        label2: "Agent Name:",
        val1: "some val",
        val2: "some val",
      },
      {
        sno: 1,
        label1: "Agent Name:",
        label2: "Agent Name:",
        val1: "some val",
        val2: "some val",
      },
    ],
  };

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
