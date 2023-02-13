import { constants } from "../../constants";
import { ActionType } from "../../types";
import * as Location from "expo-location";
export const locationReducer = (
  state: Location.LocationObjectCoords | null = null,

  { payload, type }: ActionType<Location.LocationObjectCoords>
) => {
  switch (type) {
    case constants.SET_MY_LOCATION:
      return (state = payload);
    default:
      return state;
  }
};
