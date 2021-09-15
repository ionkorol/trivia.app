import { useNavigation } from "@react-navigation/core";
import { Layout, Logo } from "components/common";
import { VStack, Button, Box } from "native-base";
import React from "react";

const HomeScreen = () => {
  const nav = useNavigation();

  return (
    <Layout>
      <VStack flex={1}>
        <Box flex={1} padding={10} justifyContent="center">
          <Logo />
        </Box>
        <VStack
          space={5}
          shadow={5}
          flex={1}
          padding={10}
          borderTopRadius={50}
          backgroundColor="white"
        >
          <Button onPress={() => nav.navigate("Game")}>PLAY</Button>
          <Button onPress={() => nav.navigate("Account")}>My Account</Button>
          <Button onPress={() => nav.navigate("LeaderBoard")}>Leaderboard</Button>
        </VStack>
      </VStack>
    </Layout>
  );
};

export default HomeScreen;
