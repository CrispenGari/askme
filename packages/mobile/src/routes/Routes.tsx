import { User } from "@askme/server";
import { NavigationContainer } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserAction } from "../actions";
import Circular from "../components/CircularIndicator/CircularIndicator";
import { COLORS, TOKEN_KEY } from "../constants";
import { StateType } from "../types";
import { store } from "../utils";
import { trpc } from "../utils/trpc";
import Tabs from "./app";
import Auth from "./auth";
const Routes = () => {
  const { duid } = useSelector((state: StateType) => state);
  const dispatch = useDispatch();
  const { isLoading, mutate } = trpc.user.fetchUserOrFail.useMutation();
  const [user, setUser] = useState<User | null>(null);
  trpc.user.onAuthStateChange.useSubscription(
    { duid },
    {
      onData: async (data) => {
        await store(TOKEN_KEY, data?.jwt ?? "");
        dispatch(setUserAction(data?.user ?? null));
        setUser(data?.user ?? null);
      },
    }
  );
  trpc.user.onNewDeviceAuthentication.useSubscription(
    { userId: user?.id ?? "" },
    {
      onData: async ({ jwt, user }) => {
        await store(TOKEN_KEY, jwt);
        dispatch(setUserAction(user));
        setUser(user);
      },
    }
  );
  trpc.user.onProfileDetailsUpdate.useSubscription(undefined, {
    onData: (data) => {
      dispatch(setUserAction(data.user));
    },
  });
  // const dispatch = useDispatch();

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted) {
      (async () => {
        await mutate();
      })();
    }
    return () => {
      mounted = false;
    };
  }, []);

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
