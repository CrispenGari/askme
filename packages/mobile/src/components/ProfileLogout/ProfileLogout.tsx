import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { isLoading } from "expo-font";
import { COLORS } from "../../constants";
import { styles } from "../../styles";
import CircularIndicator from "../CircularIndicator/CircularIndicator";
import { trpc } from "../../utils/trpc";

const ProfileLogout = () => {
  const { isLoading, data, mutate } = trpc.user.logout.useMutation();
  const signOut = async () => {
    await mutate();
  };

  return (
    <View
      style={{
        padding: 10,
        alignItems: "center",
        borderBottomWidth: 0.5,
        borderColor: COLORS.main,
      }}
    >
      <Text
        style={[
          styles.h1,
          { fontSize: 25, marginBottom: 10, alignSelf: "flex-start" },
        ]}
      >
        Sign Out
      </Text>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={signOut}
        disabled={isLoading}
        style={[
          styles.button,
          {
            width: "100%",
            alignSelf: "flex-start",
            marginBottom: 0,
            justifyContent: "center",
            flexDirection: "row",
          },
        ]}
      >
        <Text
          style={[
            styles.button__text,
            { fontSize: 20, marginRight: isLoading ? 10 : 0 },
          ]}
        >
          Logout
        </Text>
        {isLoading ? <CircularIndicator color={COLORS.main} size={20} /> : null}
      </TouchableOpacity>
    </View>
  );
};

export default ProfileLogout;
