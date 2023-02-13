import { View, ScrollView, Text } from "react-native";
import React from "react";
import ProfileAvatar from "../../../../components/ProfileAvatar/ProfileAvatar";
import ProfileDetails from "../../../../components/ProfileDetails/ProfileDetails";
import ProfileLocation from "../../../../components/ProfileLocation/ProfileLocation";
import { FONTS, COLORS } from "../../../../constants";
import { MessagesStackNavProps } from "../../../../params";
import { User, Location } from "@askme/server";
import { AppBackButton } from "../../../../components";
import { styles } from "../../../../styles";

const MessagesProfile: React.FunctionComponent<
  MessagesStackNavProps<"MessagesProfile">
> = ({ route, navigation }) => {
  const user: User & {
    location: Location;
  } = JSON.parse(route.params.user);

  React.useLayoutEffect(() => {
    let mounted: boolean = true;
    if (mounted) {
      navigation.setOptions({
        headerLeft: (props) => (
          <AppBackButton label={"Chat"} onPress={() => navigation.goBack()} />
        ),
        headerTitle: (props) => {
          return (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={[styles.p, { color: "white", fontSize: 20 }]}>
                {user.nickname || user.phoneNumber || user.email || "<unknown>"}
              </Text>
              <Text
                style={[styles.p, { color: COLORS.secondary, fontSize: 16 }]}
              >
                {user.isOnline ? "online" : "offline"}
              </Text>
            </View>
          );
        },
        headerTitleStyle: {
          color: "white",
          fontFamily: FONTS.regularBold,
          fontSize: 25,
          letterSpacing: 1,
        },
      });
    }
    return () => {
      mounted = false;
    };
  }, [user]);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: COLORS.tertiary }}>
      <ProfileAvatar allowEdit={false} user={user} />
      <ProfileDetails allowEdit={false} user={user} />
      <ProfileLocation user={user} />
      <View style={{ height: 50 }} />
    </ScrollView>
  );
};

export default MessagesProfile;
