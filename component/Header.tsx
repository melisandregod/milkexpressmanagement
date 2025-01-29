import React from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";

const Header = ({ title }: { title: string }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 50,
    backgroundColor: "#00BFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  container: {
    flex: 0,
    backgroundColor: "#00BFFF", // สีพื้นหลัง Status Bar
  },
});

export default Header;
