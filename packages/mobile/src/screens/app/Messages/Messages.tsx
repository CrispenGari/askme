import React from "react";
import { AppNavProps, MessagesStackParamList } from "../../../params";
import { createStackNavigator } from "@react-navigation/stack";
import MessagesChats from "./stacks/MessagesChats";
import MessagesChat from "./stacks/MessagesChat";
import MessagesProfile from "./stacks/MessagesProfile";
import { COLORS, FONTS } from "../../../constants";

const Stack = createStackNavigator<MessagesStackParamList>();
const Messages: React.FunctionComponent<AppNavProps<"Messages">> = () => {
  return (
    <Stack.Navigator
      initialRouteName="MessagesChats"
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.main,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        title: "Chats",
        headerTitleStyle: {
          color: "white",
          fontFamily: FONTS.regularBold,
          fontSize: 25,
          letterSpacing: 1,
        },
      }}
    >
      <Stack.Screen name="MessagesChats" component={MessagesChats} />
      <Stack.Screen name="MessagesChat" component={MessagesChat} />
      <Stack.Screen name="MessagesProfile" component={MessagesProfile} />
    </Stack.Navigator>
  );
};

export default Messages;
