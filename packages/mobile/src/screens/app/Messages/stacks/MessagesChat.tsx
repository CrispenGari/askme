import {
  View,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { Chat, Location, Message, User } from "@askme/server";
import { setOpenedChatId, setUnReadChatsCount } from "../../../../actions";
import { StateType } from "../../../../types";
import { EventArg } from "@react-navigation/native";
import InChatModal from "../../../../components/InChatModal/InChatModal";

const MessagesChat: React.FunctionComponent<
  MessagesStackNavProps<"MessagesChat">
> = ({ navigation, route }) => {
  const [messages, setMessages] = useState<Array<Message & { sender: User }>>(
    []
  );
  const scrollViewRef = React.useRef<React.LegacyRef<ScrollView> | any>();
  const friend: User & {
    location: Location;
  } = JSON.parse(route.params.friend);
  const chat: Chat = JSON.parse(route.params.chat);
  const { user } = useSelector((state: StateType) => state);
  const dispatch = useDispatch();
  const { data: chatCounts, refetch: refetchChatsCount } =
    trpc.chats.countUnOpenedChats.useQuery();
  const [isFriendTyping, setIsFriendTyping] = useState(false);
  const { mutate } = trpc.messages.openMessages.useMutation();
  const { data, isLoading, refetch } = trpc.messages.chatMessages.useQuery({
    chatId: chat.id,
  });
  const [open, setOpen] = useState<boolean>(false);
  const [selectedMessage, setSelectedMessage] = React.useState<Message | null>(
    null
  );

  trpc.messages.onUnSendMessage.useSubscription(
    { chatId: chat.id },
    {
      onData: async (data) => {
        await refetch();
      },
    }
  );
  trpc.messages.onDeleteMessage.useSubscription(
    { chatId: chat.id },
    {
      onData: async (data) => {
        await refetch();
      },
    }
  );

  trpc.messages.onMessageReaction.useSubscription(
    { chatId: chat.id },
    {
      onData: async (data) => {
        await refetch();
      },
    }
  );

  trpc.messages.onNewChatMessage.useSubscription(
    {
      chatId: chat.id,
    },
    {
      onData: async (data) => {
        await refetch();
        await refetchChatsCount();
      },
    }
  );
  trpc.messages.onReadMessages.useSubscription(
    { chatId: chat.id },
    {
      onData: async (data) => {
        await refetch();
      },
    }
  );
  trpc.chats.onUserTyping.useSubscription(
    {
      chatId: chat.id,
      userId: user?.id ?? "",
    },
    {
      onData: async (data) => {
        setIsFriendTyping(data.typing);
      },
    }
  );

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted) {
      (async () => {
        await mutate({
          chatId: chat.id,
        });
      })();
    }
    return () => {
      mounted = false;
    };
  }, []);
  React.useEffect(() => {
    const onFocus = (e: EventArg<"focus", any, undefined>) => {
      if (chat.id) dispatch(setOpenedChatId(chat.id));
    };
    navigation.addListener("focus", onFocus);
    const onBlur = (e: EventArg<"blur", any, undefined>) => {
      dispatch(setOpenedChatId(""));
    };
    navigation.addListener("blur", onBlur);
    return () => {
      navigation.removeListener("blur", onBlur);
      navigation.removeListener("focus", onFocus);
    };
  }, [navigation, dispatch, chat]);

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
              {isFriendTyping ? (
                <Text style={[styles.p, { color: COLORS.blue, fontSize: 16 }]}>
                  typing...
                </Text>
              ) : (
                <Text
                  style={[styles.p, { color: COLORS.secondary, fontSize: 16 }]}
                >
                  {friend.isOnline ? "online" : "offline"}
                </Text>
              )}
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
  }, [friend, isFriendTyping]);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!data) setMessages(data);
    return () => {
      mounted = false;
    };
  }, [data]);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!chatCounts?.chats) {
      dispatch(setUnReadChatsCount(chatCounts.chats));
    }
    return () => {
      mounted = false;
    };
  }, [chatCounts, dispatch]);

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
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={() => {}} />
          }
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({ animated: true })
          }
        >
          <InChatModal
            open={open}
            setOpen={setOpen}
            message={selectedMessage}
            me={selectedMessage?.userId !== friend.id}
          />
          <Text style={[styles.p, { textAlign: "center", margin: 10 }]}>
            Your chats with {friend.nickname} are end-to-end encrypted, not even{" "}
            {"askme"} team can access your messages.
          </Text>

          {messages.map((message) => (
            <MessageComponent
              key={message.id}
              message={message}
              me={message.userId !== friend.id}
              onLongPress={() => {
                setOpen(true);
                setSelectedMessage(message);
              }}
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
