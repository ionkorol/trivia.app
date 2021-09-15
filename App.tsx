import React from "react";

import { Provider } from "react-redux";
import { store } from "reduxx/store";

import "utils/firebase";

import MainScreen from "screens/Main";
import { NativeBaseProvider } from "native-base";
import theme from "style/theme";

const App = () => {
  return (
    <NativeBaseProvider theme={theme}>
      <Provider store={store}>
        <MainScreen />
      </Provider>
    </NativeBaseProvider>
  );
};
export default App;
