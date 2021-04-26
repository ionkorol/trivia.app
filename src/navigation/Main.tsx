import React from "react";
import { MainScreen, GameScreen } from "screens";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

interface Props {}

const MainNaviation: React.FC<Props> = (props) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="Game" component={GameScreen} />
    </Stack.Navigator>
  );
};

export default MainNaviation;
