import { User, Settings, Location } from "@askme/server";
import { constants } from "../constants";

export const setDuid = (payload: string) => {
  return {
    type: constants.SET_DUID,
    payload,
  };
};

export const setUnReadChatsCount = (payload: number) => {
  return {
    type: constants.SET_CHAT_COUNT,
    payload,
  };
};

export const setUserSettings = (payload: Settings) => {
  return {
    type: constants.SET_USER_SETTINGS,
    payload,
  };
};

export const setMyLocation = (payload: Location) => {
  return {
    type: constants.SET_MY_LOCATION,
    payload,
  };
};
export const setOpenedChatId = (payload: string) => {
  return {
    type: constants.SET_OPENED_CHAT_ID,
    payload,
  };
};

export const setUserAction = (payload: User | null) => {
  return {
    type: constants.SET_USER,
    payload,
  };
};

export const setShowAppTabs = (payload: boolean) => {
  return {
    type: constants.SHOW_APP_TABS,
    payload,
  };
};
