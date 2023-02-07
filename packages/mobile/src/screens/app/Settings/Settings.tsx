import React from "react";
import { AppNavProps, SettingsStackParamList } from "../../../params";
import { createStackNavigator } from "@react-navigation/stack";
import SettingsLanding from "./stacks/SettingsLanding";

const Stack = createStackNavigator<SettingsStackParamList>();
const Settings: React.FunctionComponent<AppNavProps<"Settings">> = () => {
  return (
    <Stack.Navigator initialRouteName="SettingsLanding" screenOptions={{}}>
      <Stack.Screen name="SettingsLanding" component={SettingsLanding} />
    </Stack.Navigator>
  );
};

export default Settings;
