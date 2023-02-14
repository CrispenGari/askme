import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { SettingsStackNavProps } from "../../../../params";
import { COLORS, FONTS } from "../../../../constants";
import ProfileAvatar from "../../../../components/ProfileAvatar/ProfileAvatar";
import ProfileDetails from "../../../../components/ProfileDetails/ProfileDetails";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "../../../../types";
import DistanceSettings from "../../../../components/DistanceSettings/DistanceSettings";
import AccountSettings from "../../../../components/AccountSettings/AccountSettings";
import NotificationSettings from "../../../../components/NotificationSettings/NotificationSettings";
import { styles } from "../../../../styles";
import { CircularIndicator } from "../../../../components";
import { trpc } from "../../../../utils/trpc";
import { setUserSettings } from "../../../../actions";

const SettingsLanding: React.FunctionComponent<
  SettingsStackNavProps<"SettingsLanding">
> = ({ navigation }) => {
  const { user, settings } = useSelector((state: StateType) => state);

  const [distance, setDistance] = React.useState<number>(0);
  const {
    isLoading,
    mutate: mutateUpdateSettings,
    data,
  } = trpc.settings.updateSettings.useMutation();
  const [on, setOn] = React.useState<boolean>(false);

  const dispatch = useDispatch();
  const updateSettings = async () => {
    await mutateUpdateSettings({
      allowNotification: on,
      distance,
    });
  };

  React.useLayoutEffect(() => {
    let mounted: boolean = true;
    if (mounted) {
      navigation.setOptions({
        headerTitle: `settings`,
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
  }, []);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!settings) {
      setOn(settings.enableNotifications);
      setDistance(settings.maxSpaceDistance);
    }
    return () => {
      mounted = false;
    };
  }, [settings]);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!data?.settings) {
      dispatch(setUserSettings(data.settings));
    }
    return () => {
      mounted = false;
    };
  }, [data, dispatch]);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: COLORS.tertiary }}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <ProfileAvatar allowEdit={false} user={user as any} />
      <ProfileDetails allowEdit={false} user={user as any} />
      <Text
        style={[
          styles.h1,
          {
            fontSize: 25,
            textAlign: "center",
            marginVertical: 20,
          },
        ]}
      >
        Customizable Settings
      </Text>
      <DistanceSettings value={distance} onChangeValue={setDistance} />
      <NotificationSettings on={on} onChange={() => setOn((state) => !state)} />

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={updateSettings}
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
          UPDATE SETTING
        </Text>
        {isLoading ? <CircularIndicator color={COLORS.main} size={20} /> : null}
      </TouchableOpacity>

      <AccountSettings />
      <View style={{ height: 50 }} />
    </ScrollView>
  );
};

export default SettingsLanding;
