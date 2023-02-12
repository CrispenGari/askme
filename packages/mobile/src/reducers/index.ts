import { duidReducer } from "./duidReducer";
import { openedChatIdReducer } from "./openedChatIdReducer";
import { showAppTabsReducer } from "./showAppTabsReducer";
import { unReadChatsReducer } from "./unReadChatsReducer";
import { userReducer } from "./userReducer";

export const reducers = {
  duid: duidReducer,
  user: userReducer,
  showAppTabs: showAppTabsReducer,
  unReadChats: unReadChatsReducer,
  openedChatId: openedChatIdReducer,
};
