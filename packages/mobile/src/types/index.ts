import { Settings, User, Location } from "@askme/server";
export interface StateType {
  duid: string;
  user?:
    | (User & {
        location: Location | null;
        settings: Settings | null;
      })
    | null;
  showAppTabs: boolean;
  unReadChats: number;
  openedChatId: string;
  location: Location;
  settings: Settings | null;
}
export interface ActionType<T> {
  payload: T;
  type: string;
}
