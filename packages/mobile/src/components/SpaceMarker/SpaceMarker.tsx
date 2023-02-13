import { Callout, Marker } from "react-native-maps";
import React from "react";
import { User } from "@askme/server";
import { Image, View, Text } from "react-native";
import updateLocal from "dayjs/plugin/updateLocale";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { COLORS, relativeTimeObject } from "../../constants";
import { styles } from "../../styles";

dayjs.extend(relativeTime);
dayjs.extend(updateLocal);

dayjs.updateLocale("en", {
  relativeTime: relativeTimeObject,
});

interface Props {
  space: {
    distance: number;
    id: string;
    lat: number;
    lon: number;
    userId: string;
    user: User;
  };
}

const SpaceMarker: React.FunctionComponent<Props> = ({ space }) => {
  return (
    <Marker
      coordinate={{
        latitude: space.lat,
        longitude: space.lon,
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
              uri: space.user?.avatar as any,
            }}
          />
          <Text style={[styles.h1]}>@{space.user.nickname}</Text>
          <Text style={[styles.p, { color: "gray" }]}>
            status:{" "}
            {space.user?.isOnline
              ? "active"
              : `last seen ${dayjs(space.user?.updatedAt).fromNow()} ago`}
          </Text>
        </View>
      </Callout>
    </Marker>
  );
};

export default SpaceMarker;
