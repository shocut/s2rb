/* eslint-disable */
import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "#90e5fc";
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    height: 20,
    fontStyle: "bold",
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
});

const ReferralTableRow = ({ items }) => {
  const rows = items.map((item) => (
    <View style={styles.row}>
      <Text style={styles.cellLabel20}>{item.label1}</Text>
      <Text style={styles.cellVal30}>{item.val1}</Text>
      <Text style={styles.cellLabel20}>{item.label2}</Text>
      <Text style={styles.cellVal30}>{item.val2}</Text>
    </View>
  ));
  return <Fragment>{rows}</Fragment>;
};

export default ReferralTableRow;
