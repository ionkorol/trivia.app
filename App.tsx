import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { MainNavigation } from "navigation";

const App = () => {
  return (
    <NavigationContainer>
      <MainNavigation />
    </NavigationContainer>
  );
};
export default App;
