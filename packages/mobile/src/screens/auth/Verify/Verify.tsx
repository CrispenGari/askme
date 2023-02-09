import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import { AuthNavProps } from "../../../params";
import { COLORS, FONTS } from "../../../constants";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "../../../styles";
import * as Animatable from "react-native-animatable";
import {
  CircularIndicator,
  CustomTextInput,
  Footer,
} from "../../../components";
import { MaterialIcons } from "@expo/vector-icons";
import { trpc } from "../../../utils/trpc";
import { getDUID } from "../../../utils";
const Verify: React.FunctionComponent<AuthNavProps<"Verify">> = ({
  navigation,
  route,
}) => {
  const [code, setCode] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  const { mutate, isLoading, data } = trpc.user.confirm.useMutation();
  const {
    mutate: resendVCode,
    isLoading: l,
    data: d,
  } = trpc.user.resendVerificationCode.useMutation();

  const resendVerificationCode = async () => {
    setCode("");
    await resendVCode({
      phoneNumber: route.params.phoneNumber ?? "",
      email: route.params.email ?? "",
    });
  };
  const verify = async () => {
    const duid = await getDUID();
    await mutate({
      code,
      phoneNumber: route.params.phoneNumber ?? "",
      email: route.params.email ?? "",
      duid: duid ?? "",
    });
  };

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!data?.user) {
      navigation.replace("Profile", {
        phoneNumber: data.user.phoneNumber ?? undefined,
        email: data.user.email ?? undefined,
      });
    }
    return () => {
      mounted = false;
    };
  }, [data]);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!data?.error) {
      setError(data.error.message);
    }
    if (mounted && !!d?.error) {
      setError(d.error.message);
    }
    return () => {
      mounted = false;
    };
  }, [d, data]);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!d?.user) {
      Alert.alert(
        "askme",
        `The verification code has been re-sent to ${
          route.params.phoneNumber || route.params.email
        }.`,
        [
          {
            text: "OK",
            onPress: () => {},
            style: "default",
          },
        ],
        {
          cancelable: false,
        }
      );
      setError("");
    }

    return () => {
      mounted = false;
    };
  }, [d]);

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
              Please enter valid verification code that has been sent to{" "}
              {route.params.phoneNumber || route.params.email}.
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
              disabled={l || isLoading}
              onPress={resendVerificationCode}
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
              onPress={verify}
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
              disabled={isLoading || l}
            >
              <Text
                style={[
                  styles.button__text,
                  { fontSize: 20, marginRight: isLoading || l ? 10 : 0 },
                ]}
              >
                Verify
              </Text>
              {isLoading || l ? (
                <CircularIndicator color={COLORS.main} size={20} />
              ) : null}
            </TouchableOpacity>
          </KeyboardAvoidingView>
          <Footer />
        </LinearGradient>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Verify;
