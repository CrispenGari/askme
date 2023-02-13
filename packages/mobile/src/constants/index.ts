import { Dimensions } from "react-native";

export const severDomain: string = `3ac2-197-98-127-119.ngrok.io`;
export const messagesLimit: number = 10;
export const constants = {
  SET_DUID: "SET_DUID",
  SET_USER: "SET_USER",
  SHOW_APP_TABS: "SHOW_APP_TABS",
  SET_CHAT_COUNT: "SET_CHAT_COUNT",
  SET_OPENED_CHAT_ID: "SET_OPENED_CHAT_ID",
  SET_MY_LOCATION: "SET_MY_LOCATION",
};
export const relativeTimeObject = {
  future: "in %s",
  past: "%s",
  s: "now",
  m: "1m",
  mm: "%dm",
  h: "1h",
  hh: "%dh",
  d: "1d",
  dd: "%dd",
  M: "1M",
  MM: "%dM",
  y: "1y",
  yy: "%dy",
};

export const TOKEN_KEY: string = "jwt";
export const COLORS = {
  main: "#8E806A",
  primary: "#C3B091",
  secondary: "#E4CDA7",
  tertiary: "#FFE6BC",
  blue: "#1D9AF1",
};

export const SCREEN_WIDTH: number = Dimensions.get("screen").width;
export const SCREEN_HEIGHT: number = Dimensions.get("screen").height;

export const Fonts = {
  PTSerifItalic: require("../../assets/fonts/PTSerif-Italic.ttf"),
  PTSerifRegular: require("../../assets/fonts/PTSerif-Regular.ttf"),
  PTSerifBold: require("../../assets/fonts/PTSerif-Bold.ttf"),
  PTSerifBoldItalic: require("../../assets/fonts/PTSerif-BoldItalic.ttf"),
};

export const FONTS = {
  regular: "PTSerifRegular",
  italic: "PTSerifItalic",
  italicBold: "PTSerifBoldItalic",
  regularBold: "PTSerifBold",
};
