import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useContext, useState } from "react";
import { View, Text } from "react-native";
import useAuth, { AuthenticatedUserProvider } from "./hooks/useAuth";

//Screens
import Chat from "./screens/Chat";
import Login from "./screens/Login";
import SignUp from "./screens/Signup";
import Home from "./screens/Home";

//Navigation :: Stack
const Stack = createNativeStackNavigator();

function ChatStack() {
  return (
    <Stack.Navigator defaultScreenOptions={Home}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator
      defaultScreenOptions={Login}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={SignUp} />
    </Stack.Navigator>
  );
}

function RootNavigator() {
  const { user } = useAuth();
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        {user ? <ChatStack /> : <AuthStack />}
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

const StackNavigator = () => {
  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
  );
};

export default StackNavigator;
