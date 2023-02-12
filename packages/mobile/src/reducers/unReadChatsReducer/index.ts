import { constants } from "../../constants";
import { ActionType } from "../../types";

export const unReadChatsReducer = (
  state: number = 0,
  { type, payload }: ActionType<number>
) => {
  switch (type) {
    case constants.SET_CHAT_COUNT:
      return (state = payload);
    default:
      return state;
  }
};
