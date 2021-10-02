/* eslint-disable */
import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  val: {
    fontSize: 12,
    fontStyle: "bold",
    textAlign: "right",
    width: 70,
  },
  label: {
    width: 70,
    textAlign: "left",
  },
});

const ReferralNo = ({ referral }) => (
  <Fragment>
    <View style={styles.container}>
      <Text style={styles.label}>Referral No.:</Text>
      <Text style={styles.val}>{referral.referral_no}</Text>
    </View>
    <View style={styles.container}>
      <Text style={styles.label}>Date: </Text>
      <Text style={styles.val}>{referral.trans_date}</Text>
    </View>
  </Fragment>
);

export default ReferralNo;
