import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import Tabs from "./app";
import Auth from "./auth";
const Routes = () => {
  const user: any = null;

  return (
    <NavigationContainer>{!!user ? <Tabs /> : <Auth />}</NavigationContainer>
  );
};

export default Routes;
