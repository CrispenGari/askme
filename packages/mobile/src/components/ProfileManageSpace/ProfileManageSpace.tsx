import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "../../styles";
import { COLORS } from "../../constants";
import { isLoading } from "expo-font";
import CircularIndicator from "../CircularIndicator/CircularIndicator";
import { trpc } from "../../utils/trpc";
import { useSelector } from "react-redux";
import { StateType } from "../../types";

const ProfileManageSpace = () => {
  const { location } = useSelector((state: StateType) => state);
  const { mutate: mutateJoinSpace, isLoading: joining } =
    trpc.spaces.joinSpace.useMutation();
  const { mutate: mutateLeaveSpace, isLoading: leaving } =
    trpc.spaces.leaveSpace.useMutation();
  const leaveSpace = async () => {
    await mutateLeaveSpace();
  };
  const joinSpace = async () => {
    if (!!!location) return;

    await mutateJoinSpace({
      lat: location.latitude,
      lon: location.longitude,
    });
  };
  return (
    <View
      style={{
        padding: 10,
        alignItems: "center",
        borderBottomWidth: 0.5,
        borderColor: COLORS.main,
        paddingBottom: 50,
      }}
    >
      <Text style={[styles.h1, { fontSize: 25, marginBottom: 10 }]}>
        Manage Your Space
      </Text>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={joinSpace}
          disabled={leaving || joining}
          style={[
            styles.button,
            {
              width: "100%",
              alignSelf: "flex-start",
              marginBottom: 0,
              justifyContent: "center",
              flexDirection: "row",
              flex: 1,
            },
          ]}
        >
          <Text
            style={[
              styles.button__text,
              { fontSize: 20, marginRight: joining ? 10 : 0 },
            ]}
          >
            JOIN SPACES
          </Text>
          {joining ? <CircularIndicator color={COLORS.main} size={20} /> : null}
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={leaveSpace}
          disabled={joining || leaving}
          style={[
            styles.button,
            {
              width: "100%",
              alignSelf: "flex-start",
              marginBottom: 0,
              justifyContent: "center",
              flexDirection: "row",
              flex: 1,
              marginLeft: 6,
              backgroundColor: COLORS.main,
            },
          ]}
        >
          <Text
            style={[
              styles.button__text,
              { fontSize: 20, marginRight: leaving ? 10 : 0 },
            ]}
          >
            LEAVE SPACES
          </Text>
          {leaving ? <CircularIndicator color={COLORS.main} size={20} /> : null}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileManageSpace;
