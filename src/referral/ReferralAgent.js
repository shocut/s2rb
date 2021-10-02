/* eslint-disable */
import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 36,
  },

  tableColumn: {
    width: "50%",
    textAlign: "center",
  },

  row: {
    flexDirection: "row",
    borderBottomColor: "#bff0fd",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    fontStyle: "bold",
  },
});

const ReferralAgent = ({ referral }) => (
  <View style={styles.row}>
    <Text style={styles.tableColumn}>Receiving Agent Information</Text>
    <Text style={styles.tableColumn}>Sending Agent Information</Text>

    <Text style={styles.tableColumn}>{referral.company}</Text>
    <Text style={styles.tableColumn}>{referral.address}</Text>
    <Text style={styles.tableColumn}>{referral.phone}</Text>
    <Text style={styles.tableColumn}>{referral.email}</Text>
  </View>
);

export default ReferralAgent;
