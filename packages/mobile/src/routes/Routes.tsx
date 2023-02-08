import { NavigationContainer } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../actions";
import Circular from "../components/CircularIndicator/CircularIndicator";
import { COLORS } from "../constants";
import { StateType } from "../types";
import { trpc } from "../utils/trpc";
import Tabs from "./app";
import Auth from "./auth";
const Routes = () => {
  const { duid, user } = useSelector((state: StateType) => state);
  const dispatch = useDispatch();
  const { isLoading, data } = trpc.user.me.useQuery();
  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && data?.me) {
      dispatch(setUser(data?.me));
    }
    return () => {
      mounted = false;
    };
  }, [dispatch, data]);

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
    <NavigationContainer>{!!user ? <Tabs /> : <Auth />}</NavigationContainer>
  );
};

export default Routes;
