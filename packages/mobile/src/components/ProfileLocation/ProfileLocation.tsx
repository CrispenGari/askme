import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Callout, MapTypes, Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useLocationPermission } from "../../hooks";
import { useSelector } from "react-redux";
import { COLORS, FONTS, relativeTimeObject } from "../../constants";
import { StateType } from "../../types";
import { styles } from "../../styles";
import updateLocal from "dayjs/plugin/updateLocale";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { CircularIndicator } from "..";
import { User } from "@askme/server";

dayjs.extend(relativeTime);
dayjs.extend(updateLocal);

dayjs.updateLocale("en", {
  relativeTime: relativeTimeObject,
});

interface Props {
  user: Partial<User> | undefined;
}
const ProfileLocation: React.FunctionComponent<Props> = ({ user }) => {
  const { granted } = useLocationPermission();
  const { user: me } = useSelector((state: StateType) => state);
  const [location, setLocation] = useState<Location.LocationObject>();
  const [currentReversedLocation, setCurrentReversedLocation] =
    useState<Location.LocationGeocodedAddress>();
  useEffect(() => {
    let mounted: boolean = true;
    if (mounted && granted) {
      (async () => {
        const location = await Location.getCurrentPositionAsync();
        setLocation(location);
      })();
    }
    return () => {
      mounted = false;
    };
  }, [granted]);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted)
      (async () => {
        if (granted && mounted && location) {
          const reversed = await Location.reverseGeocodeAsync({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
          setCurrentReversedLocation(reversed[0]);
        }
      })();
    return () => {
      mounted = false;
    };
  }, [location, granted]);

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
        {me?.id === user?.id ? "Your Space" : `${user?.nickname}'s Space`}
      </Text>
      {!!location ? (
        <MapView
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
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
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
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
                    : `last seen ${dayjs(user?.createdAt).fromNow()} ago`}
                </Text>
              </View>
            </Callout>
          </Marker>
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
