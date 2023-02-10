import React from "react";
import { AppNavProps, ProfileStackParamList } from "../../../params";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileLanding from "./stacks/ProfileLanding";
import { COLORS } from "../../../constants";

const Stack = createStackNavigator<ProfileStackParamList>();
const Profile: React.FunctionComponent<AppNavProps<"Profile">> = () => {
  return (
    <Stack.Navigator
      initialRouteName="ProfileLanding"
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.main,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
          height: 100,
        },
      }}
    >
      <Stack.Screen name="ProfileLanding" component={ProfileLanding} />
    </Stack.Navigator>
  );
};

export default Profile;
