import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { COLORS } from "../../constants";
import { styles } from "../../styles";
import ActivePerson from "../ActivePerson/ActivePerson";
import { trpc } from "../../utils/trpc";
import { StackNavigationProp } from "@react-navigation/stack";
import { MessagesStackParamList } from "../../params";
import { User } from "@askme/server";

interface Props {
  navigation: StackNavigationProp<
    MessagesStackParamList,
    "MessagesChats",
    undefined
  >;
}
const CloseActivePeople: React.FunctionComponent<Props> = ({ navigation }) => {
  const [closeActivePeople, setCloseActivePeople] = React.useState<Array<User>>(
    []
  );
  const { data, isLoading } = trpc.user.users.useQuery();

  const { mutate, data: chat } = trpc.chats.initializeChat.useMutation({});
  const [friend, setFriend] = React.useState<User | undefined>();

  trpc.user.onNewUserJoined.useSubscription(undefined, {
    onData: (data) => {
      setCloseActivePeople((state) => [data, ...state]);
    },
  });

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!chat?.chat && !!friend) {
      navigation.navigate("MessagesChat", {
        friend: JSON.stringify(friend),
        chat: JSON.stringify(chat.chat),
      });
    }
    return () => {
      mounted = false;
    };
  }, [chat, navigation, friend]);
  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!data) {
      setCloseActivePeople(data);
    }
    return () => {
      mounted = false;
    };
  }, [data]);

  return (
    <View style={{ padding: 10, backgroundColor: COLORS.secondary }}>
      <Text style={[styles.h1, { fontSize: 20 }]}>People in your Space</Text>
      <ScrollView
        style={{ width: "100%", paddingVertical: 5 }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {closeActivePeople.map((user) => (
          <ActivePerson
            key={user.id}
            user={user}
            onPress={async () => {
              setFriend(user);
              await mutate({
                friendId: user.id,
              });
            }}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default CloseActivePeople;
