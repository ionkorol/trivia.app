import React from "react";
import {
  HomeScreen,
  GameScreen,
  ResultScreen,
  AccountScreen,
  LeaderBoardScreen,
} from "screens";
import { createStackNavigator } from "@react-navigation/stack";
import { EditAccountScreen } from "screens/AccountScreens";

const Stack = createStackNavigator();

interface Props {}

const MainNaviation: React.FC<Props> = (props) => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Game" component={GameScreen} />
      <Stack.Screen name="Result" component={ResultScreen} />
      <Stack.Screen name="Account" component={AccountScreen} />
      <Stack.Screen name="LeaderBoard" component={LeaderBoardScreen} />
      <Stack.Screen name="EditAccount" component={EditAccountScreen} />
    </Stack.Navigator>
  );
};

export default MainNaviation;
