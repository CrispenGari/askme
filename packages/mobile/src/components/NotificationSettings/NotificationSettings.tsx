import { View, Text, Switch } from "react-native";
import React from "react";
import { COLORS } from "../../constants";
import { styles } from "../../styles";
import Divider from "../Divider/Divider";

interface Props {
  on: boolean;
  onChange: () => void;
}
const NotificationSettings: React.FunctionComponent<Props> = ({
  on,
  onChange,
}) => {
  return (
    <View
      style={{
        padding: 10,
        paddingTop: 0,
      }}
    >
      <Divider title="Change Notification Settings" />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          maxWidth: 400,
        }}
      >
        <Text style={[styles.p, { fontSize: 16, marginRight: 10, flex: 1 }]}>
          {on ? "Turn OFF Notifications" : "Turn ON Notifications"}
        </Text>
        <Switch
          trackColor={{ false: COLORS.main, true: COLORS.primary }}
          thumbColor={on ? COLORS.blue : COLORS.primary}
          ios_backgroundColor={COLORS.secondary}
          onValueChange={onChange}
          value={on}
        />
      </View>
    </View>
  );
};

export default NotificationSettings;
