import {
  Baloo2_400Regular,
  Baloo2_500Medium,
  Baloo2_700Bold,
} from "@expo-google-fonts/baloo-2";
import { Courgette_400Regular } from "@expo-google-fonts/courgette";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import firebase from "firebase";
import { Center, Spinner } from "native-base";
import { AuthNavigation, MainNavigation } from "navigation";
import React, { useEffect, useState } from "react";
import {
  setUserCredentials,
  readUser,
  setUserData,
} from "reduxx/slices/userSlice";
import { useAppDispatch, useAppSelector } from "reduxx/store";

const Main = () => {
  const [fontsLoaded] = useFonts({
    Baloo2_400Regular,
    Baloo2_500Medium,
    Baloo2_700Bold,
    Courgette_400Regular,
  });

  const [ready, setReady] = useState(false);

  const dispatch = useAppDispatch();
  const { data, credentials } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (fontsLoaded) {
      setReady(true);
    }
  }, [fontsLoaded]);

  useEffect(() => {
    const unsubCreds = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(readUser(user.uid) as any);
        dispatch(setUserCredentials(user.toJSON()));
      } else {
        dispatch(setUserCredentials(null));
        dispatch(setUserData(null));
      }
    });
    let unsubData = () => {};
    if (data)
      unsubData = firebase
        .firestore()
        .collection("users")
        .doc(data.id)
        .onSnapshot((snap) => {
          const data = snap.data();
          dispatch(setUserData(data));
          console.log(data)
        });

    return () => {
      unsubCreds();

      unsubData();
    };
  }, []);

  if (!ready) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  return (
    <NavigationContainer>
      {data && credentials ? <MainNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

export default Main;
