import { constants } from "../../constants";
import { ActionType } from "../../types";

export const duidReducer = (
  state: string = "",
  { payload, type }: ActionType<string>
) => {
  switch (type) {
    case constants.SET_DUID:
      return (state = payload);
    default:
      return state;
  }
};
