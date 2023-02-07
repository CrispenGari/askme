import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AppParamList } from "../../params";
import { TabIcon } from "../../components";
import { AntDesign, MaterialIcons, Octicons } from "@expo/vector-icons";
import { Home, Settings, Profile } from "../../screens/app";
import { COLORS } from "../../constants";

const Tab = createBottomTabNavigator<AppParamList>();
const App = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
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
        name="Home"
        component={Home}
        options={{
          tabBarIcon: (props) => (
            <TabIcon
              {...props}
              title="home"
              Icon={{
                name: "home",
                IconComponent: AntDesign,
              }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Messages"
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
    </Tab.Navigator>
  );
};

export default App;
