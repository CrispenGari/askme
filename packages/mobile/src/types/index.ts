import { Settings, User, Location as LT } from "@askme/server";
import * as Location from "expo-location";
export interface StateType {
  duid: string;
  user?:
    | (User & {
        location: LT | null;
        settings: Settings | null;
      })
    | null;
  showAppTabs: boolean;
  unReadChats: number;
  openedChatId: string;
  location: Location.LocationObjectCoords | null;
  settings: Settings | null;
}
export interface ActionType<T> {
  payload: T;
  type: string;
}
