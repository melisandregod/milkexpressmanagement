import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Menu from "./screens/Menu";
import HomeScreen from "./screens/HomeScreen";
import ReceiveMenu from "./screens/ReceiveMenu";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import SendMenu from "./screens/SendMenu";
import EditMenu from "./screens/EditMenu";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ReceiveMenu" component={ReceiveMenu} />
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="SendMenu" component={SendMenu} />
        <Stack.Screen name="EditMenu" component={EditMenu} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
