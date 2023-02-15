import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Message, User } from "@askme/server";
import { COLORS, FONTS, relativeTimeObject } from "../../constants";
import { styles } from "../../styles";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocal from "dayjs/plugin/updateLocale";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { trpc } from "../../utils/trpc";
import { CircularIndicator } from "..";
dayjs.extend(relativeTime);
dayjs.extend(updateLocal);

dayjs.updateLocale("en", {
  relativeTime: relativeTimeObject,
});
interface Props {
  onLongPress?: () => void;
  me: boolean;
  message: Message & { sender: User };
}
const MessageComponent: React.FunctionComponent<Props> = ({
  message,
  me,
  onLongPress,
}) => {
  const { mutate: mutateReactToMessage, isLoading: isReacting } =
    trpc.messages.reactToMessage.useMutation();
  const tap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(async () => {
      //  you can't like your message
      if (me) return;
      await mutateReactToMessage({
        messageId: message.id,
      });
    });
  if (message.message.length === 0) {
    // the messsage has been unsent
    return (
      <View
        style={{
          alignSelf: me ? "flex-end" : "flex-start",
          marginBottom: 5,
          maxWidth: "80%",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            backgroundColor: !me ? COLORS.secondary : COLORS.primary,
            padding: 5,
            borderRadius: 4,
            alignSelf: "flex-start",
            minWidth: 50,
          }}
        >
          <Text style={[styles.p, { fontFamily: FONTS.italic }]}>
            this message has been unsent
          </Text>
        </View>
      </View>
    );
  }

  return (
    <GestureDetector gesture={tap}>
      <TouchableOpacity
        activeOpacity={0.7}
        onLongPress={onLongPress}
        style={{
          alignSelf: me ? "flex-end" : "flex-start",
          marginBottom: 5,
          maxWidth: "80%",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            alignSelf: "flex-start",
          }}
        >
          <Image
            source={{ uri: message.sender.avatar ?? "" }}
            style={{
              width: 30,
              height: 30,
              borderRadius: 30,
              backgroundColor: COLORS.main,
            }}
          />
          <View style={{ position: "relative", flex: 1 }}>
            {message.liked ? (
              <MaterialIcons
                name="favorite"
                size={16}
                color={COLORS.red}
                style={{
                  position: "absolute",
                  zIndex: 10,
                  right: 0,
                  top: -10,
                }}
              />
            ) : null}
            {isReacting ? (
              <View
                style={{
                  position: "absolute",
                  zIndex: 10,
                  right: 0,
                  bottom: 10,
                }}
              >
                <CircularIndicator color={COLORS.main} size={10} />
              </View>
            ) : null}
            <View
              style={{
                backgroundColor: !me ? COLORS.secondary : COLORS.primary,
                padding: 5,
                borderRadius: 4,
                alignSelf: "flex-start",
                minWidth: 50,
              }}
            >
              <Text style={[styles.p, {}]}>{message.message}</Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
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
        </View>
      </TouchableOpacity>
    </GestureDetector>
  );
};

export default MessageComponent;
