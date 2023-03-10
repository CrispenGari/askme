import { duidReducer } from "./duidReducer";
import { locationReducer } from "./locationReducer";
import { openedChatIdReducer } from "./openedChatIdReducer";
import { showAppTabsReducer } from "./showAppTabsReducer";
import { unReadChatsReducer } from "./unReadChatsReducer";
import { userReducer } from "./userReducer";
import { userSettingsReducer } from "./userSettingsReducer";

export const reducers = {
  duid: duidReducer,
  user: userReducer,
  showAppTabs: showAppTabsReducer,
  unReadChats: unReadChatsReducer,
  openedChatId: openedChatIdReducer,
  location: locationReducer,
  settings: userSettingsReducer,
};
