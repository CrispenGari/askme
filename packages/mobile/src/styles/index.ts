import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../constants";

export const styles = StyleSheet.create({
  p: {
    fontFamily: FONTS.regular,
    fontSize: 16,
  },
  h1: {
    fontFamily: FONTS.regularBold,
    fontSize: 20,
  },

  button__text: {
    color: "white",
    fontSize: 15,
    fontFamily: FONTS.regular,
  },
  button: {
    width: "80%",
    marginVertical: 10,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 999,
    padding: 10,
    maxWidth: 300,
  },
});
