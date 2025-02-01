import React from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

const ShowSchoolMap = ({ googlemap }: { googlemap: string }) => {
  const [latitude, longitude] = googlemap.split(",").map(Number); // ✅ แยกค่าพิกัด

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        <Marker coordinate={{ latitude, longitude }} title="ตำแหน่งโรงเรียน" />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 600, // ✅ กำหนดความสูงแผนที่
    backgroundColor: "#f8f8f8",
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 20,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default ShowSchoolMap;
