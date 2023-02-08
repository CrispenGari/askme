import { View, Text, Button, ScrollView } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { trpc } from "../../../../utils/trpc";
import { store } from "../../../../utils";
import { COLORS, TOKEN_KEY } from "../../../../constants";
import { MessagesStackNavProps } from "../../../../params";
import { setUser } from "../../../../actions";
import { useDispatch } from "react-redux";
import { useLocationPermission, useSensorsPermission } from "../../../../hooks";
import { DeviceMotion } from "expo-sensors";
import * as Location from "expo-location";
import { CloseActivePeople } from "../../../../components";
const MessagesChats: React.FunctionComponent<
  MessagesStackNavProps<"MessagesChats">
> = ({ route, navigation }) => {
  const [location, setLocation] = useState<Location.LocationObject>();
  const { granted: locationPermission } = useLocationPermission();
  const { granted: sensorsPermission } = useSensorsPermission({});
  const { isLoading, error, data } = trpc.user.me.useQuery();
  const { mutate, data: logout } = trpc.user.logout.useMutation();

  const dispatch = useDispatch();
  useLayoutEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!logout) {
      (async () => {
        await store(TOKEN_KEY, logout.jwt);
        dispatch(setUser(logout.user));
      })();
    }
    return () => {
      mounted = false;
    };
  }, [logout, dispatch]);

  useEffect(() => {
    const onMove = async (event: any) => {
      if (!locationPermission) return;
      const location = await Location.getCurrentPositionAsync();
      setLocation(location);
    };
    DeviceMotion.addListener(onMove);
    return () => {
      DeviceMotion.removeAllListeners();
    };
  }, [locationPermission]);

  return (
    <View style={{ flex: 1 }}>
      {/* Users */}
      <CloseActivePeople />
      <ScrollView>
        <Text>
          {JSON.stringify(
            { locationPermission, sensorsPermission, location },
            null,
            2
          )}
        </Text>
      </ScrollView>
    </View>
  );
};

export default MessagesChats;
