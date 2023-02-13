import { View, Text, Modal, TouchableOpacity, Image } from "react-native";
import React from "react";
import { COLORS } from "../../constants";
import { styles } from "../../styles";
import CircularIndicator from "../CircularIndicator/CircularIndicator";
import { useSelector } from "react-redux";
import { StateType } from "../../types";
import { trpc } from "../../utils/trpc";

import MapView, { Callout, Marker } from "react-native-maps";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const JoinSpaceModal: React.FunctionComponent<Props> = ({ open, setOpen }) => {
  const { user, location } = useSelector((state: StateType) => state);
  const { mutate, isLoading, data } = trpc.spaces.joinSpace.useMutation();
  const joinSpace = async () => {
    if (!!location) {
      await mutate({
        lat: location.latitude,
        lon: location.longitude,
      });
    }
  };

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!data?.location?.id) {
      setOpen(false);
    }
    return () => {
      mounted = false;
    };
  }, [data]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={open}
      onRequestClose={() => {
        setOpen(false);
      }}
    >
      <View
        style={{
          justifyContent: "center",
          flex: 1,
          alignItems: "center",
          padding: 10,
        }}
      >
        <View
          style={{
            backgroundColor: `rgba(0, 0, 0, .9)`,
            width: "100%",
            padding: 10,
            borderRadius: 5,
            justifyContent: "center",
          }}
        >
          <View style={{ flexGrow: 1 }}>
            <Text
              style={[
                styles.h1,
                { fontSize: 25, textAlign: "center", color: "white" },
              ]}
            >
              Join Spaces
            </Text>
            <Text
              style={[
                styles.p,
                { fontSize: 16, textAlign: "center", color: "white" },
              ]}
            >
              Joining spaces allows you other users in your location radius, to
              interact, chat and ask questions.
            </Text>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
                marginVertical: 10,
              }}
            >
              <Text
                style={[
                  styles.p,
                  {
                    color: "white",
                    fontSize: 20,
                  },
                ]}
              >
                Join Spaces as @{user?.nickname}
              </Text>
              <View
                style={{
                  borderBottomWidth: 0.5,
                  borderBottomColor: COLORS.tertiary,
                  flex: 1,
                  marginLeft: 5,
                }}
              />
            </View>

            {!!location ? (
              <View>
                <MapView
                  initialRegion={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                  }}
                  zoomControlEnabled
                  minZoomLevel={5}
                  showsUserLocation={true}
                  style={{
                    width: "100%",
                    height: 250,
                  }}
                >
                  <Marker
                    coordinate={{
                      latitude: location.latitude,
                      longitude: location.longitude,
                    }}
                  >
                    <Callout style={{ backgroundColor: COLORS.tertiary }}>
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          padding: 10,
                          backgroundColor: COLORS.tertiary,
                        }}
                      >
                        <Image
                          style={{
                            width: 60,
                            height: 60,
                            borderRadius: 60,
                            resizeMode: "cover",
                            backgroundColor: COLORS.main,
                          }}
                          source={{
                            uri: user?.avatar as any,
                          }}
                        />
                        <Text style={[styles.h1]}>@{user?.nickname}</Text>
                        <Text style={[styles.p, { color: "gray" }]}>
                          status: {"active"}
                        </Text>
                      </View>
                    </Callout>
                  </Marker>
                </MapView>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={joinSpace}
                  disabled={isLoading}
                  style={[
                    styles.button,
                    {
                      justifyContent: "center",
                      flexDirection: "row",
                      height: 35,
                      backgroundColor: COLORS.secondary,
                      width: "100%",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.button__text,
                      { color: "black", marginRight: isLoading ? 10 : 0 },
                    ]}
                  >
                    JOIN NOW
                  </Text>
                  {isLoading ? (
                    <CircularIndicator color={COLORS.main} size={20} />
                  ) : null}
                </TouchableOpacity>
              </View>
            ) : (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: 250,
                }}
              >
                <Text
                  style={[
                    styles.p,
                    {
                      color: "white",
                    },
                  ]}
                >
                  Loading location...
                </Text>
              </View>
            )}

            <View
              style={{
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
                marginVertical: 5,
              }}
            >
              <Text
                style={[
                  styles.p,
                  {
                    color: "white",
                    fontSize: 20,
                  },
                ]}
              >
                OR
              </Text>
              <View
                style={{
                  borderBottomWidth: 0.5,
                  borderBottomColor: COLORS.tertiary,
                  flex: 1,
                  marginLeft: 5,
                }}
              />
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setOpen(false)}
              style={[
                styles.button,
                {
                  justifyContent: "center",
                  flexDirection: "row",
                  height: 35,
                },
              ]}
            >
              <Text style={[styles.button__text]}>NOT NOW</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default JoinSpaceModal;
