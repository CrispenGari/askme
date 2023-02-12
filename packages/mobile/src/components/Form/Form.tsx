import { TextInput, TouchableOpacity, Text, Image } from "react-native";
import { View } from "react-native-animatable";
import { COLORS, FONTS } from "../../constants";
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { StateType } from "../../types";
import React, { useState } from "react";
import { trpc } from "../../utils/trpc";
import { CircularIndicator } from "..";
import { useDebounce } from "use-debounce";
interface Props {
  chatId: string;
}
const Form: React.FunctionComponent<Props> = ({ chatId }) => {
  const { user } = useSelector((state: StateType) => state);
  const [message, setMessage] = React.useState<string>("");
  const { isLoading, mutate } = trpc.messages.sendMessage.useMutation();
  const { mutate: mutateTyping } = trpc.chats.userTyping.useMutation();
  const [debouncedMessage] = useDebounce(message, 1500);

  const sendMessage = async () => {
    if (!!!message) return;
    if (user?.id)
      await mutate({
        chatId,
        message: message.trim(),
        senderId: user.id,
      });
    setMessage("");
  };

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && debouncedMessage === message) {
      // the user has stopped typing
      (async () => {
        await mutateTyping({
          chatId,
          userId: user?.id ?? "",
          typing: false,
        });
      })();
    }
    if (mounted && !!message && debouncedMessage !== message) {
      // the user is typing
      (async () => {
        await mutateTyping({
          chatId,
          userId: user?.id ?? "",
          typing: true,
        });
      })();
    }
    return () => {
      mounted = false;
    };
  }, [debouncedMessage, message, chatId, user]);
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: COLORS.secondary,
        alignItems: "flex-start",
        padding: 10,
        width: "100%",
      }}
    >
      <Image
        style={{
          width: 30,
          height: 30,
          backgroundColor: COLORS.tertiary,
          borderRadius: 30,
        }}
        source={{ uri: user?.avatar ?? "" }}
      />
      <TextInput
        placeholder={"Write a message or ask anything..."}
        style={{
          backgroundColor: "#f5f5f5",
          marginHorizontal: 10,
          borderRadius: 5,
          fontFamily: FONTS.regular,
          fontSize: 18,
          paddingVertical: 5,
          paddingHorizontal: 10,
          flex: 1,
        }}
        multiline
        keyboardType="default"
        keyboardAppearance="default"
        onSubmitEditing={sendMessage}
        value={message}
        onChangeText={(text) => setMessage(text)}
      />
      {isLoading ? (
        <CircularIndicator color={COLORS.main} size={20} />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          disabled={!!!message}
          onPress={sendMessage}
        >
          <Feather name="send" size={24} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};
export default Form;
