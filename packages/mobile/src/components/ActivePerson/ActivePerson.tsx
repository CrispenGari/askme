import { User } from "@askme/server";
import React from "react";
import { TouchableOpacity, Text, View, Image, Animated } from "react-native";
import { COLORS } from "../../constants";
import { styles } from "../../styles";

interface Props {
  user: User;
  onPress?: () => void;
}
const ActivePerson: React.FunctionComponent<Props> = ({ user, onPress }) => {
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
        backgroundColor: COLORS.main,
        borderRadius: 5,
      }}
      activeOpacity={0.7}
      onPress={onPress}
    >
      {user.isOnline ? (
        <Animated.View
          style={{
            backgroundColor: COLORS.secondary,
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
      ) : null}
      <Image
        style={{
          width: 60,
          height: 60,
          borderRadius: 60,
          resizeMode: "cover",
        }}
        source={{
          uri: user.avatar as any,
        }}
      />
      <Text style={[styles.p, { color: "white" }]}>@{user.nickname}</Text>
    </TouchableOpacity>
  );
};

export default ActivePerson;
