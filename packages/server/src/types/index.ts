import { ChatsOnUsers, Message, User } from "@prisma/client";

export interface UserOnlineType {
  user: User | null;
  status: "online" | "offline";
}

export type MessageType = Message & {
  chat: {
    messages: {
      message: string;
      id: string;
      createdAt: Date;
      updatedAt: Date;
      userId: string;
      chatId: string;
      sender: User;
      read: boolean;
    }[];
    id: string;
    chatName: string;
    createdAt: Date;
    updatedAt: Date;
    userToUserChatId: string;
    users: (ChatsOnUsers & {
      user: User;
    })[];
  };
  sender: User;
};
