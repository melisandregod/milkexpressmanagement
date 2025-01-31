import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Linking, Button, ActivityIndicator } from "react-native";
import Header from "../../component/Header";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import ButtonBack from "../../component/BackButton";
import { getIceFactory, initIceDB, insertDummyIceFactory } from "../../database/IceDB";

const ShowIce = ({ navigation }: { navigation: any }) => {
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFactory();
  }, []);

  const loadFactory = async () => {
    await initIceDB(); 
    await insertDummyIceFactory(); 
    const factory = await getIceFactory();
    if (factory) setItem(factory);
    setLoading(false);
  };

  if (loading) return <ActivityIndicator size="large" color="#00BFFF" />;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.statusbar}>
        <Header title={item?.name ?? "ไม่พบข้อมูล"} />
        <View style={{ flex: 0, backgroundColor: "#ffff" }}>
          <ButtonBack text="back" onPress={() => navigation.goBack()} />
        </View>
        <View style={styles.container}>
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>📞 เบอร์ติดต่อ: {item?.phoneNumber ?? "ไม่มีข้อมูล"}</Text>
            <Text style={styles.infoText}>📦 ปริมาณ: {item?.quantity ?? "ไม่มีข้อมูล"} กิโล</Text>
          </View>

          {/* Google Map */}
          <View style={styles.mapContainer}>
            <Text style={styles.mapText}>Google Map</Text>
            <Text style={styles.mapLink} onPress={() => Linking.openURL(item?.googlemap ?? "https://maps.google.com/")}>
              เปิดแผนที่
            </Text>
          </View>

    
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    padding: 20,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  statusbar: {
    flex: 1,
    backgroundColor: "#00BFFF",
  },
  infoBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 20,
    backgroundColor: "#f8f8f8",
  },
  infoText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  mapContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderWidth: 1,
    borderColor: "black",
    width: "100%",
    backgroundColor: "#f8f8f8",
    marginBottom: 20,
  },
  mapText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  mapLink: {
    fontSize: 16,
    color: "blue",
    textDecorationLine: "underline",
    marginTop: 5,
  },
});

export default ShowIce;
