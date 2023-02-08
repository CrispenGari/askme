import {
  View,
  StyleProp,
  ViewStyle,
  TextInput,
  TouchableOpacity,
  KeyboardTypeOptions,
  TextInputSubmitEditingEventData,
  NativeSyntheticEvent,
  Text,
  TextStyle,
} from "react-native";
import React from "react";
import { FONTS } from "../../constants";

interface Props {
  containerStyles: StyleProp<ViewStyle>;
  labelStyle: StyleProp<TextStyle>;
  errorStyle: StyleProp<TextStyle>;
  inputStyle: StyleProp<TextStyle>;
  placeholder: string;
  leftIcon: React.ReactNode;
  rightIcon: React.ReactNode;
  keyboardType: KeyboardTypeOptions;
  text: string;
  onChangeText: (text: string) => void;
  secureTextEntry: boolean;
  editable: boolean;
  onSubmitEditing: (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => void;
  onRightIconPress: () => void;
  numberOfLines: number;
  multiline: boolean;
  label: string;
  error: string;
}
const CustomTextInput: React.FunctionComponent<Partial<Props>> = ({
  placeholder,
  containerStyles,
  labelStyle,
  inputStyle,
  leftIcon,
  rightIcon,
  keyboardType,
  text,
  onChangeText,
  editable,
  onSubmitEditing,
  secureTextEntry,
  onRightIconPress,
  multiline,
  numberOfLines,
  label,
  error,
  errorStyle,
}) => {
  return (
    <View style={{ width: "100%" }}>
      {label ? <Text style={labelStyle}>{label}</Text> : null}
      <View
        style={[
          {
            flexDirection: "row",
            width: "100%",
            backgroundColor: "white",
            borderRadius: 5,
            padding: 10,
            alignItems: "center",
            borderWidth: 2,
            borderColor: !!error ? "red" : "white",
          },
          containerStyles,
        ]}
      >
        {leftIcon}
        <TextInput
          placeholder={placeholder}
          style={[
            {
              flex: 1,
              backgroundColor: "#f5f5f5",
              marginHorizontal: 10,
              borderRadius: 5,
              fontFamily: FONTS.regular,
              fontSize: 18,
              paddingVertical: 5,
              paddingHorizontal: 10,
            },
            inputStyle,
          ]}
          keyboardType={keyboardType}
          value={text}
          onChangeText={onChangeText}
          editable={editable}
          onSubmitEditing={onSubmitEditing}
          secureTextEntry={secureTextEntry}
          numberOfLines={numberOfLines}
          multiline={multiline}
        />
        <TouchableOpacity activeOpacity={0.7} onPress={onRightIconPress}>
          {rightIcon}
        </TouchableOpacity>
      </View>
      {!!error ? <Text style={errorStyle}>{error}</Text> : null}
    </View>
  );
};

export default CustomTextInput;
