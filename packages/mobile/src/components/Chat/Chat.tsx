import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { Chat, Message, User } from "@askme/server";
import { COLORS, FONTS, relativeTimeObject } from "../../constants";
import { styles } from "../../styles";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocal from "dayjs/plugin/updateLocale";
import { trpc } from "../../utils/trpc";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "../../types";
import { setUnReadChatsCount } from "../../actions";

dayjs.extend(relativeTime);
dayjs.extend(updateLocal);

dayjs.updateLocale("en", {
  relativeTime: relativeTimeObject,
});
interface Props {
  chat: Chat & {
    lastMessage: Message;
    friend: User;
  };
  onPress?: () => void;
  refetchReads?: any;
}
const ChatComponent: React.FunctionComponent<Props> = ({
  chat: { friend, lastMessage, ...chat },
  onPress,
  refetchReads,
}) => {
  const { user } = useSelector((state: StateType) => state);
  const dispatch = useDispatch();
  const [isFriendTyping, setIsFriendTyping] = useState(false);
  const { data: chatCounts, refetch: refetchChatsCount } =
    trpc.chats.countUnOpenedChats.useQuery();
  const { data, refetch } = trpc.messages.countUnOpenedMessages.useQuery(
    {
      chatId: chat.id,
    },
    {
      enabled: true,
    }
  );

  trpc.messages.onReadMessages.useSubscription(
    { chatId: chat.id },
    {
      onData: async (data) => {
        await refetch();
        await refetchReads();
        await refetchChatsCount();
      },
    }
  );
  trpc.messages.onUnSendMessage.useSubscription(
    { chatId: chat.id },
    {
      onData: async (data) => {
        await refetch();
        await refetchReads();
        await refetchChatsCount();
      },
    }
  );
  trpc.messages.onDeleteMessage.useSubscription(
    { chatId: chat.id },
    {
      onData: async (data) => {
        await refetch();
        await refetchReads();
        await refetchChatsCount();
      },
    }
  );

  trpc.messages.onMessageReaction.useSubscription(
    { chatId: chat.id },
    {
      onData: async (data) => {
        await refetch();
        await refetchReads();
        await refetchChatsCount();
      },
    }
  );

  trpc.messages.onNewMessage.useSubscription(
    { uid: user?.id ?? "" },
    {
      onData: async (data) => {
        await refetch();
        await refetchReads();
        await refetchChatsCount();
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
    if (mounted && !!chatCounts?.chats) {
      dispatch(setUnReadChatsCount(chatCounts.chats));
    }
    return () => {
      mounted = false;
    };
  }, [chatCounts, dispatch]);

  return (
    <TouchableOpacity
      style={{
        backgroundColor: COLORS.primary,
        padding: 5,
        borderBottomWidth: 0.5,
        borderBottomColor: COLORS.tertiary,
        flexDirection: "row",
        alignItems: "flex-start",
      }}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <Image
        style={{
          width: 40,
          height: 40,
          borderRadius: 40,
          backgroundColor: COLORS.main,
        }}
        source={{ uri: friend.avatar ?? "" }}
      />
      <View style={{ flex: 1, marginHorizontal: 4 }}>
        <Text style={[styles.h1]}>{friend.nickname}</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {isFriendTyping ? (
            <Text
              style={[
                styles.p,
                { color: COLORS.blue, fontFamily: FONTS.italic },
              ]}
            >
              typing...
            </Text>
          ) : (
            <>
              {lastMessage?.userId === user?.id ? (
                <Ionicons
                  name="checkmark-done-outline"
                  size={16}
                  color={lastMessage?.read ? COLORS.blue : "gray"}
                  style={{ marginRight: 4 }}
                />
              ) : null}

              <Text style={[styles.p, {}]} numberOfLines={1}>
                {lastMessage?.message}
              </Text>
            </>
          )}
        </View>
      </View>
      <View style={{}}>
        {!!data?.chats && lastMessage?.userId !== user?.id ? (
          <View
            style={{
              width: 20,
              height: 20,
              backgroundColor: COLORS.tertiary,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 20,
              marginBottom: 3,
            }}
          >
            <Text style={[styles.h1, { fontSize: 16 }]}>{data.chats}</Text>
          </View>
        ) : null}
        <Text style={[styles.p, { fontSize: 12, color: "gray" }]}>
          {dayjs(lastMessage?.createdAt).fromNow()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatComponent;
