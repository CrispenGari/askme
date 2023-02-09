import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import { AuthNavProps } from "../../../params";
import { COLORS, FONTS, TOKEN_KEY } from "../../../constants";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "../../../styles";
import * as Animatable from "react-native-animatable";
import {
  CircularIndicator,
  CustomTextInput,
  Footer,
  Wrapper,
} from "../../../components";
import { MaterialIcons } from "@expo/vector-icons";
import { trpc } from "../../../utils/trpc";
import { store } from "../../../utils";
import { useDispatch } from "react-redux";
import { setUser } from "../../../actions";
const avatars: Array<string> = Array(15)
  .fill(null)
  .map(
    (_) =>
      `https://avatars.dicebear.com/api/human/${Math.random()
        .toString()
        .slice(2, 8)}.png`
  );

const Profile: React.FunctionComponent<AuthNavProps<"Profile">> = ({
  route,
}) => {
  const [nickname, setNickname] = React.useState<string>(
    route.params.email || route.params.phoneNumber || ""
  );
  const [error, setError] = React.useState<string>("");
  const [avatarIndex, setAvatarIndex] = React.useState<number>(0);
  const { mutate, data, isLoading } = trpc.user.profile.useMutation();
  const save = async () => {
    if (nickname.trim().length < 3) {
      setError("You nickname must be at least 3 characters long.");
      return;
    }
    await mutate({
      avatar: avatars[avatarIndex],
      nickname: nickname.trim().toLowerCase(),
      phoneNumber: route.params.phoneNumber ?? "",
      email: route.params.email ?? "",
    });
  };

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!data?.error) {
      setError(data.error.message);
    }
    return () => {
      mounted = false;
    };
  }, [data]);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!!data?.error) {
      (async () => {
        if (data?.jwt) {
          const { jwt } = data;
          await store(TOKEN_KEY, jwt);
        }
      })();
    }
    return () => {
      mounted = false;
    };
  }, [data]);

  return (
    <View style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
        <LinearGradient
          colors={[COLORS.primary, "black"]}
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            flex: 1,
          }}
          start={{
            x: 0,
            y: 1,
          }}
          end={{
            x: 0,
            y: 0,
          }}
        >
          <Wrapper
            withTextInputs
            containerStyles={{
              width: "100%",
              alignItems: "center",
              padding: 10,
            }}
          >
            <View
              style={{
                flex: 0.3,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 60,
              }}
            >
              <Text style={[styles.h1, { color: "white" }]}>SETUP PROFILE</Text>
              <Animatable.Image
                animation={"bounce"}
                duration={2000}
                iterationCount={1}
                easing={"linear"}
                direction={"normal"}
                useNativeDriver={false}
                source={{
                  uri: Image.resolveAssetSource(
                    require("../../../../assets/logo.png")
                  ).uri,
                }}
                style={{
                  width: 100,
                  height: 100,
                  tintColor: "white",
                  marginBottom: 10,
                  resizeMode: "contain",
                }}
              />
              <Animatable.Text
                style={[
                  styles.p,
                  {
                    marginVertical: 10,
                    width: "90%",
                    textAlign: "center",
                    color: "white",
                  },
                ]}
                animation={"zoomIn"}
                iterationCount={1}
                useNativeDriver={false}
              >
                Please set up your profile so that others will be able to
                recognize you in your space.
              </Animatable.Text>
            </View>
            <View
              style={{
                flex: 0.7,
                width: "100%",
                maxWidth: 500,
                alignSelf: "center",
              }}
            >
              <Text
                style={[
                  styles.h1,
                  {
                    color: "white",
                    alignSelf: "flex-start",
                    marginBottom: 5,
                  },
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

              <Image
                style={{
                  width: 150,
                  height: 150,
                  marginVertical: 10,
                  borderRadius: 150,
                  borderWidth: 1,
                  borderColor: COLORS.primary,
                  backgroundColor: "white",
                  alignSelf: "center",
                }}
                source={{
                  uri: avatars[avatarIndex],
                }}
              />
              <CustomTextInput
                label="Nickname"
                labelStyle={{
                  color: "white",
                  fontFamily: FONTS.regularBold,
                  fontSize: 20,
                  marginBottom: 5,
                }}
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
                }}
                text={nickname}
                onChangeText={(text) => setNickname(text)}
              />

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={save}
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
                  Save
                </Text>
                {isLoading ? (
                  <CircularIndicator color={COLORS.main} size={20} />
                ) : null}
              </TouchableOpacity>
            </View>
          </Wrapper>
          <Footer />
        </LinearGradient>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Profile;
