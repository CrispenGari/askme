import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { trpc } from "../../../utils/trpc";
import { COLORS, FONTS } from "../../../constants";
import { AuthNavProps } from "../../../params";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import { styles } from "../../../styles";

const Welcome: React.FunctionComponent<AuthNavProps<"Welcome">> = ({
  navigation,
}) => {
  const { data, isFetched, isError, isLoading } = trpc.hello.greeting.useQuery({
    name: "TRPC and React Native",
  });
  return (
    <View style={{ flex: 1 }}>
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
            style={{
              marginVertical: 10,
              width: "90%",
              textAlign: "center",
              fontFamily: FONTS.regular,
              color: "white",
            }}
            animation={"zoomIn"}
            iterationCount={1}
            useNativeDriver={false}
          >
            welcome to askme, a social application that allows you to chat with
            strangers in your radius, for directions.
          </Animatable.Text>
        </View>

        <View
          style={{
            flex: 0.5,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              navigation.replace("Register");
            }}
            style={[styles.button]}
          >
            <Text style={[styles.button__text, { fontSize: 20 }]}>
              Continue
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.replace("TnC");
            }}
            activeOpacity={0.7}
            style={[styles.button, { backgroundColor: COLORS.main }]}
          >
            <Text style={[styles.button__text, { fontSize: 20 }]}>
              Terms and Conditions
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

export default Welcome;
