import { useNavigation } from "@react-navigation/core";
import { Layout, Logo } from "components/common";
import { signinAnonymously } from "lib/user";
import { Button, Divider, HStack, Text, VStack } from "native-base";
import React from "react";

const AuthHome = () => {
  const nav = useNavigation();

  return (
    <Layout>
      <VStack flex={1}>
        <VStack backgroundColor="primary.300" flex={1} justifyContent="center">
          <Logo />
        </VStack>
        <VStack
          space={5}
          flex={2}
          backgroundColor="white"
          shadow={5}
          borderTopRadius={50}
          paddingY={10}
          paddingX={5}
        >
          <Button colorScheme="secondary" onPress={signinAnonymously}>
            Play as Guest
          </Button>

          <Button onPress={() => nav.navigate("Signin")}>Log In</Button>
          <HStack space={3} justifyContent="center" alignItems="center">
            <Divider bgColor="muted.300" width={10} />
            <Text color="muted.300">OR</Text>
            <Divider bgColor="muted.300" width={10} />
          </HStack>
          <Button onPress={() => nav.navigate("Signup")}>Register</Button>
        </VStack>
      </VStack>
    </Layout>
  );
};

export default AuthHome;
