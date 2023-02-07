import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

//  Application Param Lists
export type AppParamList = {
  Home: undefined;
  Messages: undefined;
  Profile: undefined;
};

export type AppNavProps<T extends keyof AppParamList> = {
  navigation: BottomTabNavigationProp<AppParamList, T>;
  route: RouteProp<AppParamList, T>;
};

// Home Stacks Param List
export type HomeStackParamList = {
  HomeLanding: undefined;
};

export type HomeStackNavProps<T extends keyof HomeStackParamList> = {
  navigation: StackNavigationProp<HomeStackParamList, T>;
  route: RouteProp<HomeStackParamList, T>;
};

// ================================= Auth Stack

export type AuthParamList = {
  Verify: undefined;
  Register: undefined;
  Welcome: undefined;
  Profile: undefined;
  TnC: undefined;
};

export type AuthNavProps<T extends keyof AuthParamList> = {
  navigation: StackNavigationProp<AuthParamList, T>;
  route: RouteProp<AuthParamList, T>;
};
