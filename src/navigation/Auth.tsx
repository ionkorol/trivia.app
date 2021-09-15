import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { AuthHomeScreen, SigninScreen, SignupScreen } from "screens/Auth";

const Stack = createStackNavigator();

const Auth = () => {
  return (
    <Stack.Navigator
      initialRouteName="AuthHome"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="AuthHome" component={AuthHomeScreen} />
      <Stack.Screen name="Signin" component={SigninScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};

export default Auth;
