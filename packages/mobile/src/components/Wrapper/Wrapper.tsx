import { KeyboardAvoidingView, ScrollView, ViewStyle } from "react-native";
import { COLORS } from "../../constants";

const Wrapper: React.FunctionComponent<{
  children: React.ReactNode;
  withTextInputs?: boolean;
  containerStyles?: ViewStyle;
}> = ({ children, withTextInputs = false, containerStyles }) => {
  if (withTextInputs) {
    return (
      <KeyboardAvoidingView
        style={[
          {
            flex: 1,
            width: "100%",
          },
          { ...containerStyles },
        ]}
        behavior="padding"
        enabled
        keyboardVerticalOffset={0}
      >
        <ScrollView
          style={{
            flex: 1,
            width: "100%",
          }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
  return (
    <ScrollView
      style={{
        width: "100%",
        flex: 1,
      }}
    >
      {children}
    </ScrollView>
  );
};
export default Wrapper;
