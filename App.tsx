import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { MainNavigation } from "navigation";
import { Provider } from "react-redux";
import store from "reduxx/store";

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainNavigation />
      </NavigationContainer>
    </Provider>
  );
};
export default App;
