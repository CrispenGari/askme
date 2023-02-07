import React from "react";
import { AppNavProps, ProfileStackParamList } from "../../../params";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileLanding from "./stacks/ProfileLanding";

const Stack = createStackNavigator<ProfileStackParamList>();
const Profile: React.FunctionComponent<AppNavProps<"Profile">> = () => {
  return (
    <Stack.Navigator initialRouteName="ProfileLanding" screenOptions={{}}>
      <Stack.Screen name="ProfileLanding" component={ProfileLanding} />
    </Stack.Navigator>
  );
};

export default Profile;
