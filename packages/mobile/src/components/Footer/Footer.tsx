import React from "react";
import { SafeAreaView, Text } from "react-native";
import { styles } from "../../styles";

const Footer = () => {
  return (
    <SafeAreaView
      style={{
        position: "absolute",
        bottom: 0,
        padding: 10,
        paddingHorizontal: 10,
      }}
    >
      <Text style={[styles.p, { color: "white", textAlign: "center" }]}>
        Copyright © {new Date().getFullYear()} askme Inc. All rights reserved.
      </Text>
    </SafeAreaView>
  );
};

export default Footer;
