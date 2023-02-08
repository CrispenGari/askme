import { View, Text, Button } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { MessagesStackNavProps } from "../../../../params";
import { CustomTextInput, Wrapper } from "../../../../components";
import { trpc } from "../../../../utils/trpc";
import { useLocationPermission } from "../../../../hooks";

const MessagesChat: React.FunctionComponent<
  MessagesStackNavProps<"MessagesChat">
> = ({ navigation }) => {
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
    <Wrapper withTextInputs>
      <CustomTextInput text={message} onChangeText={(t) => setMessage(t)} />
      <Text>{JSON.stringify({ num }, null, 2)}</Text>
      <Button
        title="Logout"
        onPress={async () => {
          await mutate({
            message,
            sender: "hello",
          });
        }}
      />
    </Wrapper>
  );
};

export default MessagesChat;
