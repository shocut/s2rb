/* eslint-disable */
import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import ReferralSectionHeader from "./ReferralSectionHeader";

const borderColor = "#90e5fc";
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    height: 24,
    fontStyle: "bold",
  },
  spacer: {
    height: 10,
  },
  cellLabel: {
    textAlign: "left",
    paddingLeft: 5,
    paddingRight: 5,
  },
  cellLabel10: {
    width: "10%",
    textAlign: "left",
    paddingLeft: 5,
  },
  cellLabel15: {
    width: "15%",
    textAlign: "left",
    paddingLeft: 5,
  },
  cellLabel20: {
    width: "20%",
    textAlign: "left",
    paddingLeft: 5,
  },
  cellLabel25: {
    width: "25%",
    textAlign: "left",
    paddingLeft: 5,
  },
  cellLabel30: {
    width: "30%",
    textAlign: "left",
    paddingLeft: 5,
  },
  cellLabel35: {
    width: "35%",
    textAlign: "left",
    paddingLeft: 5,
  },
  cellLabel50: {
    width: "50%",
    textAlign: "left",
    paddingLeft: 5,
  },
  cellLabel90: {
    width: "90%",
    textAlign: "left",
    paddingLeft: 5,
  },
  cellVal30: {
    width: "30%",
    textAlign: "left",
    paddingLeft: 5,
    borderBottom: 1,
  },
  cellVal25: {
    width: "25%",
    textAlign: "left",
    paddingLeft: 5,
    borderBottom: 1,
  },
  cellVal20: {
    width: "20%",
    textAlign: "left",
    paddingLeft: 5,
    borderBottom: 1,
  },
  cellVal40: {
    width: "40%",
    textAlign: "left",
    paddingLeft: 5,
    borderBottom: 1,
  },
  cellVal5: {
    width: "5%",
    textAlign: "left",
    paddingLeft: 5,
    borderBottom: 1,
  },
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
});

const ReferralAgreementSection = ({ referral }) => (
  <Fragment>
    <View style={styles.tableContainer}>
      <ReferralSectionHeader headerText="Referral Agreement Details" />
    </View>
    <View style={styles.row}>
      <Text style={styles.cellLabel40}>
        By signing this form as the receiving agent,
      </Text>
      <Text style={styles.cellVal25}>
        {referral.agentSection.items[0].val1}
      </Text>
      <Text style={styles.cellLabel35}>
        , agrees to have his/her broker-in-charge
      </Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.cellLabel30}>
        pay an agreed upon referral fee of:
      </Text>
      <Text style={styles.cellVal5}>
        {referral.agreementSection.refPercent}
      </Text>
      <Text style={styles.cellLabel}>% or $</Text>
      <Text style={styles.cellVal5}></Text>
      <Text style={styles.cellLabel50}>
        flat fee, to the sending agent's broker-in-charge, for the
      </Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.cellLabel}>benefit of sending agent:</Text>
      <Text style={styles.cellVal30}>
        {referral.agentSection.items[0].val2}
      </Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.cellLabel90}>
        Percentage based referral fee s will be based on commission earned on
        the:
      </Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.cellLabel}>Listing side</Text>
      <Text style={styles.cellVal5}></Text>
      <Text style={styles.cellLabel}>Selling side</Text>
      <Text style={styles.cellVal5}>
        {referral.agreementSection.sellingSide}
      </Text>
      <Text style={styles.cellLabel20}>Other (please specify)</Text>
      <Text style={styles.cellVal40}></Text>
    </View>
    <View style={styles.spacer}></View>
    <View style={styles.row}>
      <Text style={styles.cellLabel25}>Sending Agent Signature:</Text>
      <Text style={styles.cellVal40}></Text>
      <Text style={styles.cellLabel10}>Date:</Text>
      <Text style={styles.cellVal20}></Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.cellLabel25}>Receiving Agent Signature:</Text>
      <Text style={styles.cellVal40}></Text>
      <Text style={styles.cellLabel10}>Date:</Text>
      <Text style={styles.cellVal20}></Text>
    </View>
  </Fragment>
);

export default ReferralAgreementSection;
