import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { COLORS } from "../../constants";
import { styles } from "../../styles";
import ActivePerson from "../ActivePerson/ActivePerson";
import { trpc } from "../../utils/trpc";

const CloseActivePeople = () => {
  const { data, isLoading } = trpc.user.users.useQuery();

  console.log(data);
  return (
    <View style={{ padding: 10, backgroundColor: COLORS.tertiary }}>
      <Text style={[styles.h1, { fontSize: 20 }]}>People in your Space</Text>
      <ScrollView
        style={{ width: "100%", paddingVertical: 5 }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {data?.map((user) => (
          <ActivePerson key={user.id} user={user} />
        ))}
      </ScrollView>
    </View>
  );
};

export default CloseActivePeople;
