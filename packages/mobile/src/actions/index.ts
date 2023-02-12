import { User } from "@askme/server";
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
