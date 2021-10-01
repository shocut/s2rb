/* eslint-disable */
import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#2B2D2F",
    alignItems: "center",
    height: 18,
    textAlign: "center",
    fontStyle: "bold",
    color: "white",
    flexGrow: 1,
    lineHeight: 1,
    marginBottom: 10,
  },
  header: {
    width: "100%",
  },
});

const ReferralSectionHeader = ({ headerText }) => (
  <View style={styles.container}>
    <Text style={styles.header}>{headerText}</Text>
  </View>
);

export default ReferralSectionHeader;
