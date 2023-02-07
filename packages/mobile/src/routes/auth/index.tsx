import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthParamList } from "../../params";
import { Profile, Register, TnC, Verify, Welcome } from "../../screens/auth";

const Stack = createStackNavigator<AuthParamList>();
const Auth = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="TnC" component={TnC} />
      <Stack.Screen name="Verify" component={Verify} />
    </Stack.Navigator>
  );
};

export default Auth;
