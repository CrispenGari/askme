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
import { CircularIndicator, CustomTextInput } from "../../../components";
import { trpc } from "../../../utils/trpc";
const Register: React.FunctionComponent<AuthNavProps<"Register">> = ({
  navigation,
}) => {
  const {
    mutate,
    data,
    error: e,
    isLoading,
  } = trpc.user.register.useMutation();
  const [phoneNumber, setPhoneNumber] = React.useState<string>("");
  const [code, setCode] = React.useState<string>("+27");
  const [error, setError] = React.useState<string>("");

  const register = async () => {
    const _phoneNumber = phoneNumber.startsWith("0")
      ? phoneNumber.substring(1).replace(/\s/, "")
      : phoneNumber.replace(/\s/, "");

    if (_phoneNumber.length !== 9) {
      setError("Invalid phone number");
      return;
    } else {
      setError("");
    }

    await mutate({
      phoneNumber: code + _phoneNumber,
    });
  };

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!data) {
      navigation.replace("Verify", {
        phoneNumber: data.user.phoneNumber,
      });
    }
    return () => {
      mounted = false;
    };
  }, [data]);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!e) {
      setError(e.message);
    }
    return () => {
      mounted = false;
    };
  }, [e]);
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
              padding: 10,
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
              leftIcon={<Text style={[styles.p]}>{code}</Text>}
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
              onPress={register}
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
                Continue
              </Text>
              {isLoading ? (
                <CircularIndicator color={COLORS.main} size={20} />
              ) : null}
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </LinearGradient>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Register;
