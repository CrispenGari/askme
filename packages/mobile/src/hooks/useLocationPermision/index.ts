import React from "react";
import * as Location from "expo-location";
const useLocationPermission = () => {
  const [granted, setGranted] = React.useState<boolean>(false);
  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted) {
      (async () => {
        const { granted } = await Location.getForegroundPermissionsAsync();
        if (granted) {
          setGranted(granted);
        } else {
          const { granted } =
            await Location.requestForegroundPermissionsAsync();
          setGranted(granted);
        }
      })();
    }
    return () => {
      mounted = false;
    };
  }, []);
  return { granted };
};

export default useLocationPermission;
