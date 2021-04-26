import React from "react";
import { View, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { colors } from "style";

const Layout: React.FC = (props) => {
  return (
    <View style={{ flex: 1, backgroundColor: colors.primary }}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>{props.children}</View>
      </SafeAreaView>
    </View>
  );
};

export default Layout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});
