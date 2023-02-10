import { View, Text, Button, ScrollView } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { trpc } from "../../../../utils/trpc";
import { sendPushNotification, store } from "../../../../utils";
import { COLORS, TOKEN_KEY } from "../../../../constants";
import { MessagesStackNavProps } from "../../../../params";
import { useDispatch } from "react-redux";
import {
  useLocationPermission,
  useNotificationsToken,
  useSensorsPermission,
} from "../../../../hooks";
import { DeviceMotion } from "expo-sensors";
import * as Location from "expo-location";
import { CloseActivePeople } from "../../../../components";
const MessagesChats: React.FunctionComponent<
  MessagesStackNavProps<"MessagesChats">
> = ({ route, navigation }) => {
  const [location, setLocation] = useState<Location.LocationObject>();
  const { granted: locationPermission } = useLocationPermission();
  const { granted: sensorsPermission } = useSensorsPermission({});
  const { token } = useNotificationsToken({});

  const dispatch = useDispatch();
  useLayoutEffect(() => {
    let mounted: boolean = true;
    if (mounted) {
      (async () => {})();
    }
    return () => {
      mounted = false;
    };
  }, [dispatch]);

  // useEffect(() => {
  //   const onMove = async (event: any) => {
  //     if (!locationPermission) return;
  //     const location = await Location.getCurrentPositionAsync();
  //     setLocation(location);
  //   };
  //   DeviceMotion.addListener(onMove);
  //   return () => {
  //     DeviceMotion.removeAllListeners();
  //   };
  // }, [locationPermission]);

  return (
    <View style={{ flex: 1 }}>
      {/* Users */}
      <ScrollView style={{ flex: 1 }} bounces={false}>
        <CloseActivePeople navigation={navigation} />
      </ScrollView>
    </View>
  );
};

export default MessagesChats;
