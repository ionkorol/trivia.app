import { useNavigation } from "@react-navigation/core";
import { Layout, Logo } from "components/common";
import { Button } from "components/ui";
import React from "react";
import { StyleSheet, View } from "react-native";
import { colors } from "style";

const MainScreen = () => {
  const nav = useNavigation();

  return (
    <Layout>
      <View style={{ flex: 1, padding: 50 }}>
        <View style={styles.container}>
          <Logo />
        </View>
        <View style={styles.container}>
          <Button onPress={() => nav.navigate("Game")} outline>
            Play
          </Button>
          {/* <Button disabled outline>Multiplayer (Coming Soon...)</Button>
          <Button disabled outline>Leader Board</Button> */}
        </View>
      </View>
    </Layout>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
  },
  text: {
    fontSize: 20,
    color: colors.light,
  },
});
