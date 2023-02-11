import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { StateType } from "../../types";
import { COLORS } from "../../constants";
import { styles } from "../../styles";
import { CircularIndicator } from "..";
import { trpc } from "../../utils/trpc";
const avatars: Array<string> = Array(20)
  .fill(null)
  .map(
    (_) =>
      `https://avatars.dicebear.com/api/human/${Math.random()
        .toString()
        .slice(2, 8)}.png`
  );

const ProfileAvatar = () => {
  const { user } = useSelector((state: StateType) => state);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [avatarIndex, setAvatarIndex] = React.useState<number>(0);

  const { mutate, isLoading, data } = trpc.user.updateAvatar.useMutation();
  const updateAvatar = async () => {
    await mutate({
      avatar: avatars[avatarIndex],
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
              Select Avatar
            </Text>
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={avatars}
              horizontal
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              style={{
                width: "100%",
                flexGrow: 0,
              }}
              renderItem={({ item: uri, index }) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setAvatarIndex(index)}
                    style={{
                      marginRight: 5,
                      backgroundColor:
                        avatarIndex === index ? "white" : "transparent",
                      width: 110,
                      height: 110,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 5,
                    }}
                  >
                    <Image
                      style={{ width: 100, height: 100 }}
                      source={{
                        uri,
                      }}
                    />
                  </TouchableOpacity>
                );
              }}
            />

            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={updateAvatar}
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
        Your Avatar
      </Text>
      <Image
        source={{ uri: user?.avatar ?? "" }}
        style={{
          width: 200,
          height: 200,
          borderRadius: 200,
          backgroundColor: COLORS.main,
        }}
      />
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setModalVisible(true)}
      >
        <Text
          style={[
            styles.p,
            { fontSize: 20, marginTop: 10, color: COLORS.main },
          ]}
        >
          Change Avatar
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileAvatar;
