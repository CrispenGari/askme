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
import { COLORS, FONTS } from "../../../constants";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "../../../styles";
import * as Animatable from "react-native-animatable";
import { CustomTextInput, Wrapper } from "../../../components";
import { MaterialIcons } from "@expo/vector-icons";
const avatars: Array<string> = Array(15)
  .fill(null)
  .map(
    (_) =>
      `https://avatars.dicebear.com/api/human/${Math.random()
        .toString()
        .slice(2, 8)}.png`
  );

const Profile: React.FunctionComponent<AuthNavProps<"Profile">> = ({
  navigation,
  route,
}) => {
  const [nickname, setNickname] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  const [avatarIndex, setAvatarIndex] = React.useState<number>(0);

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
                onPress={() => {}}
                style={[
                  styles.button,
                  {
                    width: "100%",
                    alignSelf: "flex-start",
                    marginTop: 30,
                    marginBottom: 0,
                  },
                ]}
              >
                <Text style={[styles.button__text, { fontSize: 20 }]}>
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </Wrapper>
        </LinearGradient>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Profile;
