import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AppParamList } from "../../params";
import { TabIcon } from "../../components";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { Messages, Settings, Profile } from "../../screens/app";
import { COLORS } from "../../constants";
import { AppState } from "react-native";
import { trpc } from "../../utils/trpc";
import { useSelector } from "react-redux";
import { StateType } from "../../types";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { sendPushNotification } from "../../utils";
import { useNotificationsToken } from "../../hooks";
import { User } from "@askme/server";

const Tab = createBottomTabNavigator<AppParamList>();
const App = () => {
  const { user } = useSelector((state: StateType) => state);
  const [onlineUser, setOnlineUser] = useState<User | null>(null);
  const { token } = useNotificationsToken({});

  const appState = React.useRef(AppState.currentState);
  const [isOnline, setIsOnline] = React.useState<boolean>(
    appState.current === "active"
  );
  // notify others about my online state
  trpc.user.onUserOnline.useSubscription(
    { userId: !!user ? user.id : "" },
    {
      onData: (data) => {
        setOnlineUser(data);
      },
    }
  );
  const { mutate } = trpc.user.updateUserStateAndNotify.useMutation();
  React.useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      setIsOnline(nextAppState === "active");
    });
    return () => {
      subscription.remove();
    };
  }, []);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted) {
      (async () => {
        await mutate({ isOnline });
      })();
    }
    return () => {
      mounted = false;
    };
  }, [isOnline]);
  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!onlineUser && !!token) {
      (async () => {
        await sendPushNotification(
          token,
          `askme - @${onlineUser.nickname}`,
          `${onlineUser.nickname} is now online`
        );
      })();
    }
    return () => {
      mounted = false;
    };
  }, [onlineUser, token]);

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
