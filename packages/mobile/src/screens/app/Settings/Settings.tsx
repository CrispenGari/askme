import React from "react";
import { AppNavProps, SettingsStackParamList } from "../../../params";
import { createStackNavigator } from "@react-navigation/stack";
import SettingsLanding from "./stacks/SettingsLanding";
import { COLORS } from "../../../constants";

const Stack = createStackNavigator<SettingsStackParamList>();
const Settings: React.FunctionComponent<AppNavProps<"Settings">> = () => {
  return (
    <Stack.Navigator
      initialRouteName="SettingsLanding"
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.main,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
      }}
    >
      <Stack.Screen name="SettingsLanding" component={SettingsLanding} />
    </Stack.Navigator>
  );
};

export default Settings;
