import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "style";

const Logo = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.first}>IS</Text>
      <Text style={styles.second}>Trivia</Text>
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    borderBottomWidth: 3,
    borderBottomColor: colors.secondary,
  },
  first: {
    fontSize: 50,
    fontWeight: "bold",
    color: colors.secondary,
    letterSpacing: 5,
  },
  second: {
    fontSize: 50,
    fontWeight: "bold",
    color: colors.tertiary,
    letterSpacing: 5,
  },
});
