import { TouchableOpacity, Text } from "react-native";
import React from "react";
import { COLORS, FONTS } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
interface Props {
  onPress: () => void;
  label: string;
}
const AppBackButton: React.FunctionComponent<Props> = ({ onPress, label }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 10,
      }}
    >
      <Ionicons name="arrow-back-outline" size={24} color={COLORS.tertiary} />

      <Text
        style={{
          marginLeft: 2,
          color: COLORS.tertiary,
          fontFamily: FONTS.regular,
          fontSize: 20,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default AppBackButton;
