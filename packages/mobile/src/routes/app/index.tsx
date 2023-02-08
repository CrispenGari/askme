import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AppParamList } from "../../params";
import { TabIcon } from "../../components";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { Messages, Settings, Profile } from "../../screens/app";
import { COLORS } from "../../constants";
import { useSelector } from "react-redux";
import { StateType } from "../../types";

const Tab = createBottomTabNavigator<AppParamList>();
const App = () => {
  const { showAppTabs } = useSelector((state: StateType) => state);
  return (
    <Tab.Navigator
      initialRouteName="Messages"
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderTopWidth: 0,
          borderColor: "transparent",
          backgroundColor: COLORS.main,
          paddingVertical: 10,
          height: 80,
          width: "auto",
        },
        tabBarShowLabel: false,
        tabBarBadgeStyle: {
          backgroundColor: "cornflowerblue",
          color: "white",
          fontSize: 10,
          maxHeight: 20,
          maxWidth: 20,
          marginLeft: 3,
        },
        tabBarVisibilityAnimationConfig: {
          hide: {
            animation: "timing",
          },
          show: {
            animation: "spring",
          },
        },
        tabBarItemStyle: {
          width: "auto",
        },
      }}
    >
      <Tab.Screen
        name="Messages"
        component={Messages}
        options={{
          tabBarIcon: (props) => (
            <TabIcon
              {...props}
              title="chats"
              Icon={{
                name: "chatbubble-ellipses",
                IconComponent: Ionicons,
              }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: (props) => (
            <TabIcon
              {...props}
              title="profile"
              Icon={{
                name: "user",
                IconComponent: AntDesign,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: (props) => (
            <TabIcon
              {...props}
              title="settings"
              Icon={{
                name: "settings",
                IconComponent: Feather,
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default App;
