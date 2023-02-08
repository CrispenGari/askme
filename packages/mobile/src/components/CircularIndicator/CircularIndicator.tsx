import { Animated } from "react-native";
import React from "react";

interface Props {
  color: string;
  size: number;
}
const Circular: React.FunctionComponent<Props> = ({ color, size }) => {
  const indicatorAnimation = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.loop(
      Animated.timing(indicatorAnimation, {
        toValue: 1,
        delay: 0,
        duration: 1000,
        useNativeDriver: false,
      })
    ).start();
  }, []);
  const rotate = indicatorAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });
  return (
    <Animated.View
      style={{
        borderColor: "#f5f5f5",
        borderBottomColor: color,
        width: size,
        height: size,
        transform: [{ rotate }],
        borderRadius: size,
        borderWidth: 3,
      }}
    />
  );
};

export default Circular;
