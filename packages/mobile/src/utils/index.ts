import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Random from "expo-random";
export const setDUID = async (): Promise<boolean> => {
  try {
    await AsyncStorage.setItem("duid", Random.getRandomBytes(10).toString());
    return true;
  } catch (error: any) {
    console.log(error);
    return false;
  }
};
export const getDUID = async (): Promise<string | null> => {
  try {
    const duid = await AsyncStorage.getItem("duid");
    return duid;
  } catch (error: any) {
    return null;
  }
};

export const store = async (key: string, value: string): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (error: any) {
    return true;
  }
};

export const retrieve = async (key: string): Promise<string | null> => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data;
  } catch (error: any) {
    return null;
  }
};

// export const getDUID = async (): Promise<string> =>
//   await DeviceInfo.getUniqueId();
