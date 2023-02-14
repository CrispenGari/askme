import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useLocationPermission } from "../../hooks";
import { useSelector } from "react-redux";
import { COLORS, relativeTimeObject } from "../../constants";
import { StateType } from "../../types";
import { styles } from "../../styles";
import updateLocal from "dayjs/plugin/updateLocale";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { CircularIndicator } from "..";
import { User, Location as L, Settings } from "@askme/server";
import { trpc } from "../../utils/trpc";
import SpaceMarker from "../SpaceMarker/SpaceMarker";

dayjs.extend(relativeTime);
dayjs.extend(updateLocal);

dayjs.updateLocale("en", {
  relativeTime: relativeTimeObject,
});

interface Props {
  user:
    | (User & {
        location: L | null;
        settings: Settings | null;
      })
    | null
    | undefined;
}
const ProfileLocation: React.FunctionComponent<Props> = ({ user }) => {
  const { granted } = useLocationPermission();
  const { user: me } = useSelector((state: StateType) => state);
  const [currentReversedLocation, setCurrentReversedLocation] =
    useState<Location.LocationGeocodedAddress>();

  const { data, refetch } = trpc.spaces.userSpace.useQuery({
    userId: user?.id ?? "",
  });

  trpc.spaces.onUserJoinSpace.useSubscription(
    { userId: user?.id ?? "" },
    {
      onData: async (data) => {
        await refetch();
      },
    }
  );
  trpc.spaces.onUserLeaveSpace.useSubscription(
    { userId: user?.id ?? "" },
    {
      onData: async (data) => {
        await refetch();
      },
    }
  );

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!user?.location)
      (async () => {
        if (granted && mounted && !!user.location) {
          const reversed = await Location.reverseGeocodeAsync({
            latitude: user?.location?.lat,
            longitude: user?.location?.lon,
          });
          setCurrentReversedLocation(reversed[0]);
        }
      })();
    return () => {
      mounted = false;
    };
  }, [granted, user]);

  return (
    <View
      style={{
        padding: 10,
        alignItems: "center",
        borderBottomWidth: 0.5,
        borderColor: COLORS.main,
      }}
    >
      <Text style={[styles.h1, { fontSize: 25, marginBottom: 10 }]}>
        {me?.id === user?.id
          ? `Your Space (${data?.spaces?.length} users)`
          : `(${data?.spaces?.length} users) in ${user?.nickname}'s Space`}
      </Text>
      {!!user?.location ? (
        <MapView
          initialRegion={{
            latitude: user?.location.lat ?? 0,
            longitude: user?.location.lon ?? 0,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
          zoomControlEnabled
          minZoomLevel={5}
          showsUserLocation={true}
          style={{
            width: "100%",
            height: 250,
          }}
        >
          <Marker
            coordinate={{
              latitude: user?.location.lat ?? 0,
              longitude: user?.location.lon ?? 0,
            }}
          >
            <Callout style={{ backgroundColor: COLORS.tertiary }}>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 10,
                  backgroundColor: COLORS.tertiary,
                }}
              >
                <Image
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 60,
                    resizeMode: "cover",
                    backgroundColor: COLORS.main,
                  }}
                  source={{
                    uri: user?.avatar as any,
                  }}
                />
                <Text style={[styles.h1]}>@{user?.nickname}</Text>
                <Text style={[styles.p, { color: "gray" }]}>
                  status:{" "}
                  {user?.isOnline
                    ? "active"
                    : `last seen ${dayjs(user?.updatedAt).fromNow()} ago`}
                </Text>
              </View>
            </Callout>
          </Marker>

          {data?.spaces?.map((space) => (
            <SpaceMarker key={space.id} space={space} />
          ))}
        </MapView>
      ) : (
        <View
          style={{
            height: 250,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularIndicator color={COLORS.main} size={20} />
        </View>
      )}

      {!!currentReversedLocation ? (
        <View style={{ marginVertical: 5 }}>
          <Text
            style={[styles.p, { textAlign: "center" }]}
          >{`${currentReversedLocation.city}, ${currentReversedLocation.district}, ${currentReversedLocation.street} `}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default ProfileLocation;
