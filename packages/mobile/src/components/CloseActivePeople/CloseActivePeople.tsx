import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { COLORS } from "../../constants";
import { styles } from "../../styles";
import ActivePerson from "../ActivePerson/ActivePerson";
import { trpc } from "../../utils/trpc";
import { StackNavigationProp } from "@react-navigation/stack";
import { MessagesStackParamList } from "../../params";

interface Props {
  navigation: StackNavigationProp<
    MessagesStackParamList,
    "MessagesChats",
    undefined
  >;
}
const CloseActivePeople: React.FunctionComponent<Props> = ({ navigation }) => {
  const { data, isLoading } = trpc.user.users.useQuery();

  return (
    <View style={{ padding: 10, backgroundColor: COLORS.tertiary }}>
      <Text style={[styles.h1, { fontSize: 20 }]}>People in your Space</Text>
      <ScrollView
        style={{ width: "100%", paddingVertical: 5 }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {data?.map((user) => (
          <ActivePerson
            key={user.id}
            user={user}
            onPress={() => {
              navigation.navigate("MessagesChat", {
                friend: user,
              });
            }}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default CloseActivePeople;
