import { User } from "@askme/server";

export interface StateType {
  duid: string;
  user?: User;
  showAppTabs: boolean;
}
export interface ActionType<T> {
  payload: T;
  type: string;
}
