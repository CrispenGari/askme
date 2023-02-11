import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Message, User } from "@askme/server";
import { COLORS, relativeTimeObject } from "../../constants";
import { styles } from "../../styles";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocal from "dayjs/plugin/updateLocale";

dayjs.extend(relativeTime);
dayjs.extend(updateLocal);

dayjs.updateLocale("en", {
  relativeTime: relativeTimeObject,
});
interface Props {
  onPress?: () => void;
  me: boolean;
  message: Message & { sender: User };
}
const MessageComponent: React.FunctionComponent<Props> = ({
  onPress,
  message,
  me,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "flex-start",
        maxWidth: "80%",
        alignSelf: me ? "flex-end" : "flex-start",
        marginBottom: 5,
      }}
    >
      <Image
        source={{ uri: message.sender.avatar ?? "" }}
        style={{
          width: 30,
          height: 30,
          borderRadius: 30,
          backgroundColor: COLORS.main,
          marginRight: 5,
        }}
      />
      <View style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: !me ? COLORS.secondary : COLORS.primary,
            padding: 5,
            borderRadius: 4,
          }}
        >
          <Text style={[styles.p, {}]}>{message.message}</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={[styles.p, { fontSize: 12, color: "gray" }]}>
            {dayjs(message.createdAt).fromNow()}
          </Text>
          {me ? (
            <Ionicons
              name="checkmark-done-outline"
              size={12}
              color={message.read ? COLORS.blue : "gray"}
            />
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MessageComponent;
