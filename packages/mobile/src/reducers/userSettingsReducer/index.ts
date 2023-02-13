import { Settings } from "@askme/server";
import { constants } from "../../constants";
import { ActionType } from "../../types";

export const userSettingsReducer = (
  state: Settings | null = null,
  { payload, type }: ActionType<Settings | null>
) => {
  switch (type) {
    case constants.SET_USER_SETTINGS:
      return (state = payload);
    default:
      return state;
  }
};
