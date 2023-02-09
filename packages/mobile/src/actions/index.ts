import { User } from "@askme/server";
import { constants } from "../constants";

export const setDuid = (payload: string) => {
  return {
    type: constants.SET_DUID,
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
