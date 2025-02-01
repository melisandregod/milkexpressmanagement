import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { PaperProvider, DefaultTheme } from "react-native-paper";
import Menu from "./screens/Menu";
import HomeScreen from "./screens/HomeScreen";
import ReceiveMenu from "./screens/ReceivePages/ReceiveMenu";
import SendMenu from "./screens/SendPages/SendMenu";
import EditMenu from "./screens/EditPages/EditMenu";
import ShowSchool from "./screens/SendPages/ShowSchool";
import ShowIce from "./screens/ReceivePages/ShowIce";
import ShowMilk from "./screens/ReceivePages/ShowMilk";
import EditSchool from "./screens/EditPages/EditSchool";
import AddSchool from "./screens/EditPages/AddSchool";
import EditMilk from "./screens/EditPages/EditMilk";
import EditReceiveMenu from "./screens/EditPages/EditReceiveMenu";
import EditIce from "./screens/EditPages/EditIce";



const Stack = createStackNavigator();

const App = () => {
  
  return (
    <PaperProvider>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ReceiveMenu" component={ReceiveMenu} />
        <Stack.Screen name="ShowIce" component={ShowIce} />
        <Stack.Screen name="ShowMilk" component={ShowMilk} />
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="SendMenu" component={SendMenu} />
        <Stack.Screen name="ShowSchool" component={ShowSchool} />
        <Stack.Screen name="EditMenu" component={EditMenu} />
        <Stack.Screen name="EditReceiveMenu" component={EditReceiveMenu} />
        <Stack.Screen name="EditSchool" component={EditSchool} />
        <Stack.Screen name="EditMilk" component={EditMilk} />
        <Stack.Screen name="EditIce" component={EditIce} />
        <Stack.Screen name="AddSchool" component={AddSchool} />
      </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
