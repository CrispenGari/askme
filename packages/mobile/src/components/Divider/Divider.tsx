import { View, Text } from "react-native";
import React from "react";
import { COLORS } from "../../constants";
import { styles } from "../../styles";

interface Props {
  title: string;
}
const Divider: React.FunctionComponent<Props> = ({ title }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        marginVertical: 10,
      }}
    >
      <Text
        style={[
          styles.p,
          {
            color: "black",
            fontSize: 20,
          },
        ]}
      >
        {title}
      </Text>
      <View
        style={{
          borderBottomWidth: 0.5,
          borderBottomColor: COLORS.main,
          flex: 1,
          marginLeft: 5,
        }}
      />
    </View>
  );
};

export default Divider;
