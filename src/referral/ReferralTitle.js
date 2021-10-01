/* eslint-disable */
import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    marginTop: 1,
  },
  title: {
    letterSpacing: 1.5,
    fontSize: 15,
    textAlign: "center",
  },
});

const ReferralTitle = ({ title }) => (
  <View style={styles.titleContainer}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

export default ReferralTitle;
