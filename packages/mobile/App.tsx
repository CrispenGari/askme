import "react-native-gesture-handler";
import { LogBox, View, Text, StatusBar } from "react-native";
import TRPCProvider from "./src/providers/TRPCProvider";
import ReactReduxProvider from "./src/providers/ReactReduxProvider";
import Routes from "./src/routes/Routes";
import { useFonts } from "expo-font";
import { Fonts } from "./src/constants";

LogBox.ignoreLogs;
LogBox.ignoreAllLogs();

const App = () => {
  const [loaded] = useFonts(Fonts);

  if (!loaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <StatusBar barStyle={"light-content"} />
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <TRPCProvider>
      <ReactReduxProvider>
        <View style={{ flex: 1 }}>
          <StatusBar barStyle={"light-content"} />
          <Routes />
        </View>
      </ReactReduxProvider>
    </TRPCProvider>
  );
};

export default App;
