import { View, ScrollView } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { trpc } from "../../../../utils/trpc";
import { COLORS } from "../../../../constants";
import { MessagesStackNavProps } from "../../../../params";
import { useSelector } from "react-redux";

import {
  ChatComponent,
  CircularIndicator,
  CloseActivePeople,
} from "../../../../components";
import { Chat, Message, User } from "@askme/server";
import { StateType } from "../../../../types";
import JoinSpaceModal from "../../../../components/JoinSpaceModal/JoinSpaceModal";
const MessagesChats: React.FunctionComponent<
  MessagesStackNavProps<"MessagesChats">
> = ({ navigation }) => {
  const { user: me } = useSelector((state: StateType) => state);
  const { isLoading, data, refetch } = trpc.chats.allChats.useQuery();
  const { data: myLocation } = trpc.spaces.myLocation.useQuery();
  const [openJoinSpaceModal, setOpenJoinSpaceModal] = useState<boolean>(false);

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

  useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!myLocation) {
      if (!!!myLocation.location) {
        setOpenJoinSpaceModal(true);
      }
      if (myLocation.location?.lat === 0 && myLocation.location?.lon === 0) {
        setOpenJoinSpaceModal(true);
      }
    }
    return () => {
      mounted = false;
    };
  }, [myLocation]);

  return (
    <View style={{ flex: 1 }}>
      {/* Users */}
      <ScrollView
        style={{ flex: 1, backgroundColor: COLORS.tertiary }}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <JoinSpaceModal
          setOpen={setOpenJoinSpaceModal}
          open={openJoinSpaceModal}
        />
        <CloseActivePeople navigation={navigation} />

        {isLoading ? (
          <View style={{ alignItems: "center" }}>
            <CircularIndicator color={COLORS.main} size={20} />
          </View>
        ) : null}
        {chats
          .filter((chat) => !!chat.lastMessage)
          .sort(
            (a, b) =>
              new Date(b.lastMessage.createdAt).getTime() -
              new Date(a.lastMessage.createdAt).getTime()
          )
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
