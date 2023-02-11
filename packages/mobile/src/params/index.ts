import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

//  Application Param Lists
export type AppParamList = {
  Messages: undefined;
  Profile: undefined;
  Settings: undefined;
};

export type AppNavProps<T extends keyof AppParamList> = {
  navigation: BottomTabNavigationProp<AppParamList, T>;
  route: RouteProp<AppParamList, T>;
};

// Messages Stacks Param List
export type MessagesStackParamList = {
  MessagesChats: undefined;
  MessagesChat: {
    friend: string;
    chat: string;
  };
  MessagesProfile: {
    user: string;
  };
};

export type MessagesStackNavProps<T extends keyof MessagesStackParamList> = {
  navigation: StackNavigationProp<MessagesStackParamList, T>;
  route: RouteProp<MessagesStackParamList, T>;
};

// Profile Stacks Param List
export type ProfileStackParamList = {
  ProfileLanding: undefined;
};

export type ProfileStackNavProps<T extends keyof ProfileStackParamList> = {
  navigation: StackNavigationProp<ProfileStackParamList, T>;
  route: RouteProp<ProfileStackParamList, T>;
};

// Settings Stacks Param List
export type SettingsStackParamList = {
  SettingsLanding: undefined;
};

export type SettingsStackNavProps<T extends keyof SettingsStackParamList> = {
  navigation: StackNavigationProp<SettingsStackParamList, T>;
  route: RouteProp<SettingsStackParamList, T>;
};

// ================================= Auth Stack

export type AuthParamList = {
  Verify: Partial<{ phoneNumber: string; email: string }>;
  Register: undefined;
  Welcome: undefined;
  Profile: Partial<{ phoneNumber: string; email: string }>;
  TnC: undefined;
};

export type AuthNavProps<T extends keyof AuthParamList> = {
  navigation: StackNavigationProp<AuthParamList, T>;
  route: RouteProp<AuthParamList, T>;
};
