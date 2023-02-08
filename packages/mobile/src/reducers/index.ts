import { duidReducer } from "./duidReducer";
import { showAppTabsReducer } from "./showAppTabsReducer";
import { userReducer } from "./userReducer";

export const reducers = {
  duid: duidReducer,
  user: userReducer,
  showAppTabs: showAppTabsReducer,
};
