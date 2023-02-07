import "react-native-gesture-handler";
import { LogBox, View, Text } from "react-native";
import TRPCProvider from "./src/providers/TRPCProvider";
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
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <TRPCProvider>
      <View style={{ flex: 1 }}>
        <Routes />
      </View>
    </TRPCProvider>
  );
};

export default App;
