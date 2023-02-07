import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { AuthNavProps } from "../../../params";
import { COLORS, FONTS } from "../../../constants";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "../../../styles";
import * as Animatable from "react-native-animatable";
import { CustomTextInput } from "../../../components";
import { MaterialIcons } from "@expo/vector-icons";
const Verify: React.FunctionComponent<AuthNavProps<"Verify">> = ({
  navigation,
  route,
}) => {
  const [code, setCode] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
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
          <View
            style={{
              flex: 0.5,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={[styles.h1, { color: "white" }]}>
              VERIFY PHONE NUMBER
            </Text>
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
              Please enter valid verification code that has been sent to {23}{" "}
              via SMS.
            </Animatable.Text>
          </View>

          <KeyboardAvoidingView
            style={{
              flex: 0.5,
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              maxWidth: 500,
            }}
            behavior="padding"
            enabled
            keyboardVerticalOffset={100}
          >
            <CustomTextInput
              label="Verification Code"
              labelStyle={{
                color: "white",
                fontFamily: FONTS.regularBold,
                fontSize: 20,
                marginBottom: 5,
              }}
              error={error}
              errorStyle={[styles.p, { color: "red", marginTop: 5 }]}
              leftIcon={
                <MaterialIcons name="verified" size={24} color={COLORS.main} />
              }
              keyboardType="phone-pad"
              placeholder="0 0 0 - 0 0 0"
              containerStyles={{
                width: "100%",
                maxWidth: 500,
              }}
              inputStyle={{ textAlign: "center" }}
              text={code}
              onChangeText={(text) => setCode(text)}
            />
            <TouchableOpacity
              style={{ alignSelf: "flex-end", marginVertical: 5 }}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.p,
                  {
                    color: "white",
                    textDecorationLine: "underline",
                    fontSize: 20,
                  },
                ]}
              >
                Did not receive the code?
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                navigation.replace("Profile", {
                  phoneNumber: route.params.phoneNumber,
                });
              }}
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
                Verify
              </Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </LinearGradient>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Verify;
