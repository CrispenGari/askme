import { Location } from "@askme/server";
import { constants } from "../../constants";
import { ActionType } from "../../types";

export const locationReducer = (
  state: Location | null = null,

  { payload, type }: ActionType<Location | null>
) => {
  switch (type) {
    case constants.SET_MY_LOCATION:
      return (state = payload);
    default:
      return state;
  }
};
