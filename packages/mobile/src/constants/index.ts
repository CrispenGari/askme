import { Dimensions } from "react-native";

export const COLORS = {
  main: "#8E806A",
  primary: "#C3B091",
  secondary: "#E4CDA7",
  tertiary: "#FFE6BC",
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
