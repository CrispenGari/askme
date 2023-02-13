import { View, Text } from "react-native";
import React from "react";
import { COLORS } from "../../constants";
import { styles } from "../../styles";
import Divider from "../Divider/Divider";
import Slider from "@react-native-community/slider";

interface Props {
  value: number;
  onChangeValue: (value: number) => void;
}
const DistanceSettings: React.FC<Props> = ({ value, onChangeValue }) => {
  return (
    <View
      style={{
        padding: 10,
        paddingTop: 0,
      }}
    >
      <Divider title="Change Distance" />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          maxWidth: 400,
        }}
      >
        <Slider
          style={{ width: "100%", height: 10, flex: 1 }}
          minimumValue={0}
          maximumValue={10}
          lowerLimit={1}
          minimumTrackTintColor={COLORS.primary}
          maximumTrackTintColor={COLORS.secondary}
          thumbTintColor={COLORS.main}
          value={value}
          onValueChange={(value) => onChangeValue(value)}
        />
        <Text style={[styles.h1, { fontSize: 20, marginLeft: 10 }]}>
          {value.toFixed(2)} km.
        </Text>
      </View>
    </View>
  );
};

export default DistanceSettings;
