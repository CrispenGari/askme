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
  CircularIndicator,
  Message as MessageComponent,
} from "../../../../components";
import { trpc } from "../../../../utils/trpc";
import { COLORS, FONTS } from "../../../../constants";
import { styles } from "../../../../styles";
import { useHeaderHeight } from "@react-navigation/elements";
import Form from "../../../../components/Form/Form";
import { Chat, Message, User } from "@askme/server";

const MessagesChat: React.FunctionComponent<
  MessagesStackNavProps<"MessagesChat">
> = ({ navigation, route }) => {
  const [messages, setMessages] = useState<Array<Message & { sender: User }>>(
    []
  );

  const height = useHeaderHeight();
  const scrollViewRef = React.useRef<React.LegacyRef<ScrollView> | any>();
  const friend: User = JSON.parse(route.params.friend);
  const chat: Chat = JSON.parse(route.params.chat);
  const { data, isLoading } = trpc.messages.chatMessages.useQuery({
    chatId: chat.id,
  });
  trpc.messages.onNewChatMessage.useSubscription(
    {
      chatId: chat.id,
    },
    {
      onData: (data: any) => {
        setMessages((state) => [...state, data]);
      },
    }
  );
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
              onPress={() => {
                navigation.navigate("MessagesProfile", {
                  user: JSON.stringify(friend),
                });
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
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("MessagesProfile", {
                  user: JSON.stringify(friend),
                });
              }}
              activeOpacity={0.7}
              style={{ marginRight: 10 }}
            >
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

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!data) setMessages(data);
    return () => {
      mounted = false;
    };
  }, [data]);

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
          scrollEnabled={true}
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({ animated: true })
          }
        >
          <Text style={[styles.p, { textAlign: "center", margin: 10 }]}>
            Your chats with {friend.nickname} are end-to-end encrypted, not even{" "}
            {"askme"} team can access your messages.
          </Text>
          {isLoading ? (
            <View style={{ alignItems: "center" }}>
              <CircularIndicator color={COLORS.main} size={20} />
            </View>
          ) : null}

          {messages.map((message) => (
            <MessageComponent
              key={message.id}
              message={message}
              me={message.userId !== friend.id}
            />
          ))}
          <View style={{ height: 20 }} />
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
          <Form chatId={chat.id} />
        </KeyboardAvoidingView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default MessagesChat;
