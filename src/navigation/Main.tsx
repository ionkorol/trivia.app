import React from "react";
import { MainScreen, GameScreen, ResultScreen } from "screens";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

interface Props {}

const MainNaviation: React.FC<Props> = (props) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="Game" component={GameScreen} />
      <Stack.Screen name="Result" component={ResultScreen} />
    </Stack.Navigator>
  );
};

export default MainNaviation;
