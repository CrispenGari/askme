import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
  SafeAreaView,
  Keyboard,
  TextInput,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { MessagesStackNavProps } from "../../../../params";
import {
  AppBackButton,
  CustomTextInput,
  Form,
  Wrapper,
} from "../../../../components";
import { trpc } from "../../../../utils/trpc";
import { useLocationPermission } from "../../../../hooks";
import { COLORS, FONTS } from "../../../../constants";
import { styles } from "../../../../styles";
import { SCREEN_HEIGHT } from "@gorhom/bottom-sheet";
import { useHeaderHeight } from "@react-navigation/elements";

const MessagesChat: React.FunctionComponent<
  MessagesStackNavProps<"MessagesChat">
> = ({ navigation, route }) => {
  const { friend } = route.params;
  const height = useHeaderHeight();
  const scrollViewRef = React.useRef<React.LegacyRef<ScrollView> | any>();
  React.useLayoutEffect(() => {
    let mounted: boolean = true;
    if (mounted) {
      navigation.setOptions({
        headerLeft: (props) => (
          <AppBackButton
            label={props.label ?? "Chats"}
            onPress={() => navigation.goBack()}
          />
        ),

        headerTitle: (props) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={[styles.p, { color: "white", fontSize: 20 }]}>
                {friend.nickname ||
                  friend.phoneNumber ||
                  friend.email ||
                  "<unknown>"}
              </Text>
              <Text
                style={[styles.p, { color: COLORS.secondary, fontSize: 16 }]}
              >
                {friend.isOnline ? "online" : "offline"}
              </Text>
            </TouchableOpacity>
          );
        },

        headerTitleStyle: {
          fontFamily: FONTS.regular,
          color: "white",
          marginHorizontal: 5,
        },
        headerRight: (props) => {
          return (
            <TouchableOpacity activeOpacity={0.7} style={{ marginRight: 10 }}>
              <Image
                source={{
                  uri: friend.avatar ?? "",
                }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 40,
                  backgroundColor: COLORS.tertiary,
                }}
              />
            </TouchableOpacity>
          );
        },
      });
    }
    return () => {
      mounted = false;
    };
  }, [friend]);

  const { granted } = useLocationPermission();
  const [num, setNum] = useState<any>();
  trpc.messages.onSendMessage.useSubscription(undefined, {
    onData(data) {
      setNum(data);
    },
  });
  const { mutate, data } = trpc.messages.sendMessage.useMutation();
  const [message, setMessage] = useState("");

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.main,
      }}
    >
      <KeyboardAvoidingView
        style={{
          flex: 1,
          width: "100%",
        }}
        behavior="padding"
        enabled
        keyboardVerticalOffset={30}
      >
        <ScrollView
          style={{
            flex: 1,
            width: "100%",
            backgroundColor: COLORS.tertiary,
            padding: 5,
          }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <Text style={[styles.p, { textAlign: "center", margin: 10 }]}>
            Your chats with {friend.nickname} are end-to-end encrypted, not even{" "}
            {"askme"} team can access your messages.
          </Text>
        </ScrollView>
        <KeyboardAvoidingView
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
          keyboardVerticalOffset={0}
          behavior="padding"
          enabled
        >
          <Form />
        </KeyboardAvoidingView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default MessagesChat;
