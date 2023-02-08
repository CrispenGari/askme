import React from "react";
import { TouchableOpacity, Text, View, Image, Animated } from "react-native";
import { COLORS } from "../../constants";
import { styles } from "../../styles";

const ActivePerson = () => {
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
  const scale = indicatorAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1.02],
  });
  return (
    <TouchableOpacity
      style={{
        position: "relative",
        marginRight: 5,
        width: 100,
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 5,
      }}
    >
      <Animated.View
        style={{
          backgroundColor: COLORS.main,
          width: 10,
          height: 10,
          transform: [{ scale }],
          position: "absolute",
          top: 10,
          right: 10,
          borderRadius: 10,
          zIndex: 10,
        }}
      />
      <Image
        style={{
          width: 60,
          height: 60,
          borderRadius: 60,
          resizeMode: "cover",
        }}
        source={{
          uri: "http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcR556SU3NatNpvdHLSznjYRn0T_ENfzc0PO8bxsJYqNgEko0qgAahyKGCpK7PmnIYX3O74x6jYaYX0ee50RVV0hsxlUuzc7VJs6yv52y60v",
        }}
      />
      <Text style={[styles.h1]}>@crispen</Text>
    </TouchableOpacity>
  );
};

export default ActivePerson;
