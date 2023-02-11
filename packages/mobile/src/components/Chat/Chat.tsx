import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Chat, Message, User } from "@askme/server";
import { COLORS, relativeTimeObject } from "../../constants";
import { styles } from "../../styles";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocal from "dayjs/plugin/updateLocale";

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
}
const ChatComponent: React.FunctionComponent<Props> = ({
  chat: { friend, lastMessage },
  onPress,
}) => {
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
        <Text style={[styles.p]} numberOfLines={1}>
          {lastMessage?.message}
        </Text>
      </View>
      <View style={{}}>
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
          <Text style={[styles.h1, { fontSize: 16 }]}>2</Text>
        </View>
        <Text style={[styles.p, { fontSize: 16, color: "gray" }]}>
          {dayjs(lastMessage.createdAt).fromNow()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatComponent;
