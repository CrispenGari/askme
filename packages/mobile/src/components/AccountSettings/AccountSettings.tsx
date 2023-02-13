import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Divider from "../Divider/Divider";
import { styles } from "../../styles";

import { COLORS } from "../../constants";
import CircularIndicator from "../CircularIndicator/CircularIndicator";
import { trpc } from "../../utils/trpc";

const AccountSettings = () => {
  const { mutate, isLoading, data } = trpc.user.deleteAccount.useMutation();
  const deleteAccount = async () => {
    await mutate();
  };

  return (
    <View
      style={{
        padding: 10,
        paddingTop: 0,
      }}
    >
      <Divider title="Change Notification Settings" />

      <Text style={[styles.p, { fontSize: 16, color: "red" }]}>
        Deleting your account is irreversible action, you will lost your chats,
        together with your spaces.
      </Text>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={deleteAccount}
        disabled={isLoading}
        style={[
          styles.button,
          {
            width: "100%",
            alignSelf: "flex-start",
            marginBottom: 0,
            justifyContent: "center",
            flexDirection: "row",
            backgroundColor: COLORS.main,
          },
        ]}
      >
        <Text
          style={[
            styles.button__text,
            { fontSize: 20, marginRight: isLoading ? 10 : 0 },
          ]}
        >
          DELETE ACCOUNT
        </Text>
        {isLoading ? <CircularIndicator color={COLORS.main} size={20} /> : null}
      </TouchableOpacity>
    </View>
  );
};

export default AccountSettings;
