import { View, Text, TouchableOpacity, Modal } from "react-native";
import React from "react";
import { styles } from "../../styles";
import { COLORS, relativeTimeObject } from "../../constants";
import { useSelector } from "react-redux";
import { StateType } from "../../types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocal from "dayjs/plugin/updateLocale";
import { CircularIndicator, CustomTextInput } from "..";
import { MaterialIcons } from "@expo/vector-icons";
import { trpc } from "../../utils/trpc";
dayjs.extend(relativeTime);
dayjs.extend(updateLocal);

dayjs.updateLocale("en", {
  relativeTime: relativeTimeObject,
});

const ProfileDetails = () => {
  const { user } = useSelector((state: StateType) => state);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [bio, setBio] = React.useState(user?.bio ?? "");
  const [nickname, setNickname] = React.useState(user?.nickname ?? "");
  const [error, setError] = React.useState<string>("");

  const { isLoading, mutate, data } =
    trpc.user.updatePublicDetails.useMutation();
  const updateDetails = async () => {
    if (nickname.trim().length < 3) {
      setError("You nickname must be at least 3 characters long.");
      return;
    }
    await mutate({
      bio,
      nickname: nickname.trim().toLowerCase(),
    });
  };

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!data?.user) {
      setModalVisible(false);
    }
    return () => {
      mounted = false;
    };
  }, [data]);
  return (
    <View
      style={{
        padding: 10,
        alignItems: "center",
        borderBottomWidth: 0.5,
        borderColor: COLORS.main,
      }}
    >
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            justifyContent: "center",
            flex: 1,
            alignItems: "center",
            padding: 10,
          }}
        >
          <View
            style={{
              backgroundColor: `rgba(0, 0, 0, .5)`,
              width: "100%",
              padding: 10,
              borderRadius: 5,
            }}
          >
            <Text
              style={[
                styles.h1,
                { color: "white", fontSize: 20, textAlign: "center" },
              ]}
            >
              Update Details
            </Text>

            <CustomTextInput
              error={error}
              errorStyle={[styles.p, { color: "red", marginTop: 5 }]}
              leftIcon={
                <MaterialIcons
                  name="drive-file-rename-outline"
                  size={24}
                  color={COLORS.main}
                />
              }
              keyboardType="default"
              placeholder="nickname"
              containerStyles={{
                width: "100%",
                maxWidth: 500,
                marginBottom: 4,
              }}
              text={nickname}
              onChangeText={(text) => setNickname(text)}
            />
            <CustomTextInput
              text={bio}
              keyboardType="default"
              leftIcon={
                <MaterialIcons name="biotech" size={24} color={COLORS.main} />
              }
              onChangeText={(text) => setBio(text)}
              placeholder="bio"
              multiline
              numberOfLines={2}
              containerStyles={{ margin: 0 }}
            />

            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={updateDetails}
                style={[
                  styles.button,
                  {
                    alignSelf: "flex-start",
                    justifyContent: "center",
                    flexDirection: "row",
                    flex: 1,
                    marginRight: 10,
                    backgroundColor: COLORS.secondary,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.button__text,
                    { marginRight: isLoading ? 10 : 0, color: "black" },
                  ]}
                >
                  Update
                </Text>
                {isLoading ? (
                  <CircularIndicator color={COLORS.main} size={20} />
                ) : null}
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setModalVisible(false)}
                style={[
                  styles.button,
                  {
                    justifyContent: "center",
                    flexDirection: "row",
                    flex: 1,
                  },
                ]}
              >
                <Text style={[styles.button__text]}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Text style={[styles.h1, { fontSize: 25, marginBottom: 10 }]}>
        Public Details
      </Text>
      <Text style={[styles.h1, { marginBottom: 3 }]}>@{user?.nickname}</Text>
      <Text style={[styles.p, { color: "gray" }]}>
        {user?.bio || "<No bio provided.>"}
      </Text>
      <Text style={[styles.p]}>{user?.phoneNumber || user?.email}</Text>
      <Text style={[styles.p, { color: "gray" }]}>
        Joined: {dayjs(user?.createdAt).fromNow()} ago
      </Text>

      <TouchableOpacity
        activeOpacity={0.7}
        style={{ alignSelf: "flex-start" }}
        onPress={() => setModalVisible(true)}
      >
        <Text
          style={[
            styles.p,
            { fontSize: 20, marginTop: 10, color: COLORS.main },
          ]}
        >
          Edit details
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileDetails;
