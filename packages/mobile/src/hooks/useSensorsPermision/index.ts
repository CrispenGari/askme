import React from "react";

import { DeviceMotion } from "expo-sensors";
const useSensorsPermission = ({}) => {
  const [granted, setGranted] = React.useState<boolean>(false);
  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted) {
      (async () => {
        const { granted } = await DeviceMotion.getPermissionsAsync();
        if (granted) {
          setGranted(granted);
        } else {
          const { granted } = await DeviceMotion.getPermissionsAsync();
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

export default useSensorsPermission;
