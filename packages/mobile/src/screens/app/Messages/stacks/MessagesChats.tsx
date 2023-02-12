import { View, Text, Button, ScrollView } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { trpc } from "../../../../utils/trpc";
import { sendPushNotification, store } from "../../../../utils";
import { COLORS, TOKEN_KEY } from "../../../../constants";
import { MessagesStackNavProps } from "../../../../params";
import { useDispatch, useSelector } from "react-redux";
import {
  useLocationPermission,
  useNotificationsToken,
  useSensorsPermission,
} from "../../../../hooks";
import { DeviceMotion } from "expo-sensors";
import * as Location from "expo-location";
import {
  ChatComponent,
  CircularIndicator,
  CloseActivePeople,
} from "../../../../components";
import { Chat, Message, User } from "@askme/server";
import { StateType } from "../../../../types";
const MessagesChats: React.FunctionComponent<
  MessagesStackNavProps<"MessagesChats">
> = ({ route, navigation }) => {
  const [location, setLocation] = useState<Location.LocationObject>();
  const { granted: locationPermission } = useLocationPermission();
  const { granted: sensorsPermission } = useSensorsPermission({});
  const { token } = useNotificationsToken({});
  const { user: me } = useSelector((state: StateType) => state);
  const { isLoading, data, refetch } = trpc.chats.allChats.useQuery();
  const [chats, setChats] = React.useState<
    Array<
      Chat & {
        lastMessage: Message;
        friend: User;
      }
    >
  >([]);
  trpc.messages.onNewMessage.useSubscription(
    {
      uid: me?.id ?? "",
    },
    {
      onData: async (data) => {
        await refetch();
      },
    }
  );
  trpc.user.onUserOnline.useSubscription(
    { userId: me?.id ?? "" },
    {
      onData: async (data) => {
        await refetch();
      },
    }
  );

  const dispatch = useDispatch();
  useLayoutEffect(() => {
    let mounted: boolean = true;
    if (mounted) {
      (async () => {})();
    }
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!data?.chats) {
      setChats(
        data.chats.map(
          ({
            users,
            messages,
            chatName,
            createdAt,
            id,
            updatedAt,
            userToUserChatId,
          }) => ({
            friend: users[0].user,
            lastMessage: messages[0],
            chatName,
            createdAt,
            id,
            updatedAt,
            userToUserChatId,
          })
        )
      );
    }
    return () => {
      mounted = false;
    };
  }, [data]);

  // useEffect(() => {
  //   const onMove = async (event: any) => {
  //     if (!locationPermission) return;
  //     const location = await Location.getCurrentPositionAsync();
  //     setLocation(location);
  //   };
  //   DeviceMotion.addListener(onMove);
  //   return () => {
  //     DeviceMotion.removeAllListeners();
  //   };
  // }, [locationPermission]);

  return (
    <View style={{ flex: 1 }}>
      {/* Users */}
      <ScrollView
        style={{ flex: 1, backgroundColor: COLORS.tertiary }}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <CloseActivePeople navigation={navigation} />

        {isLoading ? (
          <View style={{ alignItems: "center" }}>
            <CircularIndicator color={COLORS.main} size={20} />
          </View>
        ) : null}
        {chats
          .filter((chat) => !!chat.lastMessage)
          .map((chat) => (
            <ChatComponent
              key={chat.id}
              chat={chat}
              refetchReads={refetch}
              onPress={() => {
                navigation.navigate("MessagesChat", {
                  chat: JSON.stringify(chat),
                  friend: JSON.stringify(chat.friend),
                });
              }}
            />
          ))}
      </ScrollView>
    </View>
  );
};

export default MessagesChats;
