import { User } from "@askme/server";

export interface StateType {
  duid: string;
  user?: Partial<User>;
  showAppTabs: boolean;
  unReadChats: number;
}
export interface ActionType<T> {
  payload: T;
  type: string;
}
