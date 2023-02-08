import React, { useState } from "react";
import { View, Image, Text } from "react-native";
import { COLORS } from "../../constants";
import * as Device from "expo-device";
interface IconI {
  IconComponent: any;
  name: string;
}
interface Props {
  title?: string;
  Icon: IconI;
  focused: boolean;
}
const TabIcon: React.FC<Props> = ({ focused, Icon, title }) => {
  const [deviceType, setDeviceType] = useState<Device.DeviceType>(
    Device.DeviceType.UNKNOWN
  );

  React.useEffect(() => {
    let mounted: boolean = true;

    if (mounted) {
      async () => {
        const type = await Device.getDeviceTypeAsync();
        setDeviceType(type);
      };
    }
    return () => {
      mounted = false;
    };
  }, []);
  return (
    <View
      style={[
        {
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        },
        deviceType !== Device.DeviceType.PHONE ? { width: 100 } : {},
      ]}
    >
      <Icon.IconComponent
        name={Icon.name}
        size={20}
        color={focused ? "white" : COLORS.tertiary}
      />
      <Text style={{ color: focused ? "white" : COLORS.tertiary }}>
        {title}
      </Text>
    </View>
  );
};

export default TabIcon;
