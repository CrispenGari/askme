import AsyncStorage from "@react-native-async-storage/async-storage";

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
