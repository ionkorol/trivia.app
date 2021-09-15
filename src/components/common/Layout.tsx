import {
  Box,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StatusBar,
} from "native-base";
import React from "react";
import {
  LayoutAnimation,
  SafeAreaView,
  Platform,
  Keyboard,
} from "react-native";

interface Props {
  scroll?: boolean;
}

const Layout: React.FC<Props> = (props) => {
  const { scroll } = props;
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

  return (
    <Box flex={1} backgroundColor="primary.300">
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
        {scroll ? (
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            flex={1}
          >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              <Pressable onPress={Keyboard.dismiss} flex={1}>
                {props.children}
              </Pressable>
            </ScrollView>
          </KeyboardAvoidingView>
        ) : (
          <Box flex={1}>{props.children}</Box>
        )}
      </SafeAreaView>
    </Box>
  );
};

export default Layout;
