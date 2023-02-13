import React, { useEffect, useLayoutEffect, useState } from "react";
import { AppNavProps, MessagesStackParamList } from "../../../params";
import { createStackNavigator } from "@react-navigation/stack";
import MessagesChats from "./stacks/MessagesChats";
import MessagesChat from "./stacks/MessagesChat";
import MessagesProfile from "./stacks/MessagesProfile";
import { COLORS, FONTS } from "../../../constants";
import { useSelector } from "react-redux";
import { StateType } from "../../../types";

const Stack = createStackNavigator<MessagesStackParamList>();
const Messages: React.FunctionComponent<AppNavProps<"Messages">> = ({
  navigation,
}) => {
  const { unReadChats } = useSelector((state: StateType) => state);

  useLayoutEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!unReadChats) {
      navigation.setOptions({
        tabBarBadge: unReadChats >= 9 ? `9+` : unReadChats,
        tabBarBadgeStyle: {
          display: unReadChats === 0 ? "none" : "flex",
          backgroundColor: COLORS.primary,
          color: "white",
          fontSize: 16,
          position: "absolute",
          top: -5,
          fontFamily: FONTS.regularBold,
          justifyContent: "center",
          alignItems: "center",
        },
      });
    }
    return () => {
      mounted = false;
    };
  }, [unReadChats]);

  return (
    <Stack.Navigator
      initialRouteName="MessagesChats"
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.main,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
          height: 100,
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
