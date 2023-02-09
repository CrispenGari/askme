import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { ProfileStackNavProps } from "../../../../params";
import { isLoading } from "expo-font";
import { CircularIndicator } from "../../../../components";
import { COLORS } from "../../../../constants";
import { styles } from "../../../../styles";
import { trpc } from "../../../../utils/trpc";

const ProfileLanding: React.FunctionComponent<
  ProfileStackNavProps<"ProfileLanding">
> = ({ route, navigation }) => {
  const { isLoading, data, mutate } = trpc.user.logout.useMutation();

  const signOut = async () => {
    await mutate();
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={signOut}
        disabled={isLoading}
        style={[
          styles.button,
          {
            width: "100%",
            alignSelf: "flex-start",
            marginTop: 30,
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
    </ScrollView>
  );
};

export default ProfileLanding;
