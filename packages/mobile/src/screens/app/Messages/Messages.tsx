import React from "react";
import { AppNavProps, MessagesStackParamList } from "../../../params";
import { createStackNavigator } from "@react-navigation/stack";
import MessagesChats from "./stacks/MessagesChats";
import MessagesChat from "./stacks/MessagesChat";
import MessagesProfile from "./stacks/MessagesProfile";

const Stack = createStackNavigator<MessagesStackParamList>();
const Messages: React.FunctionComponent<AppNavProps<"Messages">> = () => {
  return (
    <Stack.Navigator initialRouteName="MessagesChats" screenOptions={{}}>
      <Stack.Screen name="MessagesChats" component={MessagesChats} />
      <Stack.Screen name="MessagesChat" component={MessagesChat} />
      <Stack.Screen name="MessagesProfile" component={MessagesProfile} />
    </Stack.Navigator>
  );
};

export default Messages;