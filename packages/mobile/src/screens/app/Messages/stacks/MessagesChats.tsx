import { View, Text } from "react-native";
import React from "react";
import { trpc } from "../../../../utils/trpc";

const MessagesChats = () => {
  const { isLoading, error, data } = trpc.user.me.useQuery();
  return (
    <View>
      <Text>{JSON.stringify({ isLoading, error, data }, null, 2)}</Text>
    </View>
  );
};

export default MessagesChats;
