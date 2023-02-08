import { NavigationContainer } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import Circular from "../components/CircularIndicator/CircularIndicator";
import { COLORS, TOKEN_KEY } from "../constants";
import { retrieve } from "../utils";
import { trpc } from "../utils/trpc";
import Tabs from "./app";
import Auth from "./auth";
const Routes = () => {
  const { isLoading, data } = trpc.user.me.useQuery();

  if (isLoading) {
    return (
      <LinearGradient
        colors={[COLORS.primary, "black"]}
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          flex: 1,
        }}
        start={{
          x: 0,
          y: 1,
        }}
        end={{
          x: 0,
          y: 0,
        }}
      >
        <Circular size={30} color={COLORS.main} />
      </LinearGradient>
    );
  }
  return (
    <NavigationContainer>
      {!!data?.me ? <Tabs /> : <Auth />}
    </NavigationContainer>
  );
};

export default Routes;
