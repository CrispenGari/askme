import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SettingsStackNavProps } from "../../../../params";
import { COLORS, FONTS } from "../../../../constants";

const SettingsLanding: React.FunctionComponent<
  SettingsStackNavProps<"SettingsLanding">
> = ({ navigation }) => {
  React.useLayoutEffect(() => {
    let mounted: boolean = true;
    if (mounted) {
      navigation.setOptions({
        headerTitle: `settings`,
        headerTitleStyle: {
          color: "white",
          fontFamily: FONTS.regularBold,
          fontSize: 25,
          letterSpacing: 1,
        },
      });
    }
    return () => {
      mounted = false;
    };
  }, []);
  return (
    <ScrollView style={{ flex: 1, backgroundColor: COLORS.tertiary }}>
      {/* Distance settings */}
      {/* Account settings */}
      {/* Notification Settings */}
      <Text>Settings goes here</Text>
    </ScrollView>
  );
};

export default SettingsLanding;
