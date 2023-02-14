import { View, ScrollView } from "react-native";
import React from "react";
import { ProfileStackNavProps } from "../../../../params";
import { COLORS, FONTS } from "../../../../constants";
import { useSelector } from "react-redux";
import { StateType } from "../../../../types";
import ProfileAvatar from "../../../../components/ProfileAvatar/ProfileAvatar";
import ProfileDetails from "../../../../components/ProfileDetails/ProfileDetails";
import ProfileLocation from "../../../../components/ProfileLocation/ProfileLocation";
import ProfileLogout from "../../../../components/ProfileLogout/ProfileLogout";
import ProfileManageSpace from "../../../../components/ProfileManageSpace/ProfileManageSpace";

const ProfileLanding: React.FunctionComponent<
  ProfileStackNavProps<"ProfileLanding">
> = ({ navigation }) => {
  const { user } = useSelector((state: StateType) => state);

  React.useLayoutEffect(() => {
    let mounted: boolean = true;
    if (mounted) {
      navigation.setOptions({
        headerTitle: `@${user?.nickname}` ?? "profile",
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
    <ScrollView
      style={{ flex: 1, backgroundColor: COLORS.tertiary }}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <ProfileAvatar allowEdit={true} user={user as any} />
      <ProfileDetails allowEdit={true} user={user as any} />
      <ProfileLocation user={user as any} />
      <ProfileManageSpace />
      <ProfileLogout />
      <View style={{ height: 50 }} />
    </ScrollView>
  );
};

export default ProfileLanding;
