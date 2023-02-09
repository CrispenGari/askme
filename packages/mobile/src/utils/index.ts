import AsyncStorage from "@react-native-async-storage/async-storage";

export const setDUID = async (): Promise<boolean> => {
  try {
    await AsyncStorage.setItem("duid", Math.random().toString().slice(2));
    return true;
  } catch (error: any) {
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
