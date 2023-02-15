import { View, Text, Modal, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Message } from "@askme/server";
import { isLoading } from "expo-font";
import { COLORS } from "../../constants";
import { styles } from "../../styles";
import CircularIndicator from "../CircularIndicator/CircularIndicator";
import { useSelector } from "react-redux";
import { StateType } from "../../types";
import { trpc } from "../../utils/trpc";

interface Props {
  open: boolean;
  me: boolean;
  message: Message | null;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const InChatModal: React.FunctionComponent<Props> = ({
  open,
  setOpen,
  message,
  me,
}) => {
  const { isLoading: bumping, mutateAsync: mutateSendMessage } =
    trpc.messages.sendMessage.useMutation();
  const { isLoading: unsending, mutateAsync: mutateUnSendMessage } =
    trpc.messages.unSendMessage.useMutation();
  const { isLoading: deleting, mutateAsync: mutateDeleteMessage } =
    trpc.messages.deleteMessage.useMutation();
  const { isLoading: reacting, mutateAsync: reactToMessage } =
    trpc.messages.reactToMessage.useMutation();
  const { user } = useSelector((state: StateType) => state);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={open}
      onRequestClose={() => {
        setOpen(false);
      }}
    >
      <TouchableOpacity
        style={{
          justifyContent: "flex-end",
          flex: 1,
          alignItems: "center",
          padding: 10,
        }}
        activeOpacity={0.7}
        onPress={() => setOpen(false)}
      >
        {me ? (
          <View
            style={{
              width: "100%",
              backgroundColor: "rgba(0, 0, 0, .7)",
              padding: 10,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
            }}
          >
            {/* bumb */}
            <Button
              onPress={() => {
                if (!!message && !!user?.id) {
                  mutateSendMessage({
                    chatId: message.chatId,
                    senderId: user.id,
                    message: message.message,
                  }).then(() => setOpen(false));
                }
              }}
              isLoading={bumping}
              title="Bump"
              titleColor={COLORS.blue}
            />
            {/* unsend */}
            <Button
              onPress={() => {
                if (!!message) {
                  mutateUnSendMessage({
                    messageId: message.id,
                  }).then(() => {
                    setOpen(false);
                  });
                }
              }}
              isLoading={unsending}
              title="Unsend"
            />
            {/* delete */}
            <Button
              onPress={() => {
                if (!!message)
                  mutateDeleteMessage({
                    messageId: message.id,
                  }).then(() => setOpen(false));
              }}
              isLoading={deleting}
              title="Delete"
              titleColor={COLORS.red}
            />
          </View>
        ) : (
          <View
            style={{
              width: "100%",
              backgroundColor: "rgba(0, 0, 0, .7)",
              padding: 10,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
            }}
          >
            <Button
              onPress={() => {
                if (!!message && !!user?.id) {
                  mutateSendMessage({
                    chatId: message.chatId,
                    senderId: user.id,
                    message: message.message,
                  }).then(() => setOpen(false));
                }
              }}
              isLoading={bumping}
              title={"Bump"}
              titleColor={COLORS.blue}
            />

            <Button
              onPress={() => {
                if (!!message)
                  reactToMessage({ messageId: message.id }).then(() =>
                    setOpen(false)
                  );
              }}
              isLoading={reacting}
              title={message?.liked ? "Unlike" : "Like"}
            />
          </View>
        )}
      </TouchableOpacity>
    </Modal>
  );
};

export default InChatModal;

interface ButtonProps {
  onPress: () => void;
  title: string;
  isLoading: boolean;
  titleColor?: string;
}
const Button: React.FunctionComponent<ButtonProps> = ({
  isLoading,
  onPress,
  title,
  titleColor,
}) => (
  <TouchableOpacity
    activeOpacity={0.7}
    onPress={onPress}
    disabled={isLoading}
    style={[
      styles.button,
      {
        width: "100%",
        marginBottom: 0,
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "transparent",
        borderBottomWidth: 0.5,
        borderBottomColor: "white",
        borderTopWidth: 0.5,
        margin: 0,
      },
    ]}
  >
    <Text
      style={[
        styles.button__text,
        {
          fontSize: 20,
          marginRight: isLoading ? 10 : 0,
          color: titleColor ? titleColor : "white",
        },
      ]}
    >
      {title}
    </Text>
    {isLoading ? <CircularIndicator color={COLORS.main} size={20} /> : null}
  </TouchableOpacity>
);
