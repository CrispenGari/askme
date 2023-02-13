import { User } from "@askme/server";
import * as Location from "expo-location";
export interface StateType {
  duid: string;
  user?: Partial<User>;
  showAppTabs: boolean;
  unReadChats: number;
  openedChatId: string;
  location: Location.LocationObjectCoords;
}
export interface ActionType<T> {
  payload: T;
  type: string;
}
