/* eslint-disable */
import React from "react";
import { View, StyleSheet } from "@react-pdf/renderer";
import ReferralSectionHeader from "./ReferralSectionHeader";
import ReferralTableRow from "./ReferralDetailRow";

const tableRowsCount = 11;

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
  },
});

const ReferralSection = ({ referralSection }) => (
  <View style={styles.tableContainer}>
    <ReferralSectionHeader headerText={referralSection.sectionTitle} />
    <ReferralTableRow items={referralSection.items} />
  </View>
);

export default ReferralSection;
