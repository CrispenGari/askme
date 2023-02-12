import { constants } from "../../constants";
import { ActionType } from "../../types";

export const openedChatIdReducer = (
  state: string = "",
  { payload, type }: ActionType<string>
) => {
  switch (type) {
    case constants.SET_OPENED_CHAT_ID:
      return (state = payload);
    default:
      return state;
  }
};
