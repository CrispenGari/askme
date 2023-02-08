import { constants } from "../../constants";
import { ActionType } from "../../types";

export const showAppTabsReducer = (
  state: boolean = true,
  { payload, type }: ActionType<boolean>
) => {
  switch (type) {
    case constants.SHOW_APP_TABS:
      return (state = payload);
    default:
      return state;
  }
};
