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
const Register: React.FunctionComponent<AuthNavProps<"Register">> = ({
  navigation,
}) => {
  const [phoneNumber, setPhoneNumber] = React.useState<string>("");
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
            <Text style={[styles.h1, { color: "white" }]}>REGISTER</Text>
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
              Please enter valid phone number. Note that the verification code
              will be sent via SMS to this number.
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
              label="Phone Number"
              labelStyle={{
                color: "white",
                fontFamily: FONTS.regularBold,
                fontSize: 20,
                marginBottom: 5,
              }}
              error={error}
              errorStyle={[styles.p, { color: "red", marginTop: 5 }]}
              leftIcon={<Text style={[styles.p]}>+27</Text>}
              keyboardType="phone-pad"
              placeholder="phone number"
              containerStyles={{
                width: "100%",
                maxWidth: 500,
              }}
              text={phoneNumber}
              onChangeText={(text) => setPhoneNumber(text)}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                navigation.replace("Verify", {
                  phoneNumber,
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
                Continue
              </Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </LinearGradient>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Register;
