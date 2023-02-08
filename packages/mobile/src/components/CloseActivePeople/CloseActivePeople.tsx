import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { COLORS } from "../../constants";
import { styles } from "../../styles";
import ActivePerson from "../ActivePerson/ActivePerson";

const CloseActivePeople = () => {
  return (
    <View style={{ padding: 10, backgroundColor: COLORS.tertiary }}>
      <Text style={[styles.h1, { fontSize: 20 }]}>People in your Space</Text>
      <ScrollView
        style={{ width: "100%", paddingVertical: 5 }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <ActivePerson />
        <ActivePerson />
        <ActivePerson />
      </ScrollView>
    </View>
  );
};

export default CloseActivePeople;
