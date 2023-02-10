import { TextInput, TouchableOpacity, Text, Image } from "react-native";
import { View } from "react-native-animatable";
import { COLORS, FONTS } from "../../constants";
import CustomTextInput from "../CustomTextInput/CustomTextInput";
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { StateType } from "../../types";

const Form = () => {
  const { user } = useSelector((state: StateType) => state);
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: COLORS.secondary,
        alignItems: "flex-start",
        padding: 10,
        width: "100%",
      }}
    >
      <Image
        style={{
          width: 30,
          height: 30,
          backgroundColor: COLORS.tertiary,
          borderRadius: 30,
        }}
        source={{ uri: user?.avatar ?? "" }}
      />
      <TextInput
        placeholder={"Write a message or ask anything..."}
        style={{
          backgroundColor: "#f5f5f5",
          marginHorizontal: 10,
          borderRadius: 5,
          fontFamily: FONTS.regular,
          fontSize: 18,
          paddingVertical: 5,
          paddingHorizontal: 10,
          flex: 1,
        }}
        multiline
      />
      <TouchableOpacity activeOpacity={0.7} onPress={() => {}}>
        <Feather name="send" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};
export default Form;
