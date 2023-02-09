import React from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

const useNotificationsToken = ({}) => {
  const [token, setToken] = React.useState<string>("");
  React.useEffect(() => {
    let mounted = true;
    if (mounted) {
      (async () => {
        if (Device.isDevice) {
          const { status: existingStatus } =
            await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;
          if (existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }
          if (finalStatus !== "granted") {
            alert("Failed to get push token for push notification!");
            return;
          }
          const { data } = await Notifications.getExpoPushTokenAsync();
          setToken(data);
        } else {
          alert("Must use physical device for Push Notifications");
        }

        if (Platform.OS === "android") {
          Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FF231F7C",
          });
        }
      })();
    }
    return () => {
      mounted = false;
    };
  }, []);

  return {
    token,
  };
};

export default useNotificationsToken;
