import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AppParamList } from "../../params";
import { TabIcon } from "../../components";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { Messages, Settings, Profile } from "../../screens/app";
import { COLORS, FONTS } from "../../constants";
import { AppState } from "react-native";
import { trpc } from "../../utils/trpc";
import { useSelector } from "react-redux";
import { StateType } from "../../types";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { sendPushNotification } from "../../utils";
import { useNotificationsToken } from "../../hooks";
import { User, UserOnlineType } from "@askme/server";

const Tab = createBottomTabNavigator<AppParamList>();
const App = () => {
  const { user } = useSelector((state: StateType) => state);
  const [onlineUser, setOnlineUser] = useState<UserOnlineType | undefined>();
  const [newUserJoin, setNewUserJoined] = useState<User | null>(null);
  const { token } = useNotificationsToken({});

  const appState = React.useRef(AppState.currentState);
  const [isOnline, setIsOnline] = React.useState<boolean>(
    appState.current === "active"
  );
  // notify others about my online state
  trpc.user.onUserOnline.useSubscription(
    { userId: user?.id ?? "" },
    {
      onData: ({ user, status }) => {
        setOnlineUser({
          status,
          user,
        });
      },
    }
  );
  trpc.user.onNewUserJoined.useSubscription(undefined, {
    onData: (data) => {
      setNewUserJoined(data);
    },
  });
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
          `askme - @${onlineUser.user?.nickname}`,
          onlineUser.status === "online"
            ? `${onlineUser.user?.nickname} is now online`
            : `${onlineUser.user?.nickname} went offline.`
        );
      })();
    }
    return () => {
      mounted = false;
    };
  }, [onlineUser, token]);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!newUserJoin && !!token && user?.id) {
      (async () => {
        if (user.id !== newUserJoin.id) {
          await sendPushNotification(
            token,
            `askme - @${newUserJoin.nickname}`,
            `${newUserJoin.nickname} just joined and is in your space.`
          );
        }
      })();
    }
    return () => {
      mounted = false;
    };
  }, [newUserJoin, token, user]);

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
          backgroundColor: COLORS.primary,
          color: "white",
          fontSize: 16,
          position: "absolute",
          top: -5,
          fontFamily: FONTS.regularBold,
          justifyContent: "center",
          alignItems: "center",
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
