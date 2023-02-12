import { User } from "@askme/server";

export interface StateType {
  duid: string;
  user?: Partial<User>;
  showAppTabs: boolean;
  unReadChats: number;
  openedChatId: string;
}
export interface ActionType<T> {
  payload: T;
  type: string;
}
