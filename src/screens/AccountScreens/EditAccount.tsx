import { Layout } from "components/common";
import {
  Box,
  Button,
  Heading,
  HStack,
  Input,
  VStack,
  Text,
  Center,
  Spinner,
  Icon,
  IconButton,
} from "native-base";
import React from "react";
import { useAppSelector } from "reduxx/store";
import { FontAwesome5 } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/core";
import {
  AccountInfoForm,
  LoginInfoForm,
  SaveAccountForm,
} from "components/account/Edit";

const EditAccount = () => {
  const { data, credentials } = useAppSelector((state) => state.user);
  const nav = useNavigation();

  if (!data || !credentials) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }
  return (
    <Layout scroll>
      <VStack flex={1}>
        <Box padding={5} alignItems="center">
          <IconButton
            icon={<Icon as={FontAwesome5} name="arrow-left" />}
            position="absolute"
            top={5}
            left={3}
            onPress={nav.goBack}
          />
          <Heading>Edit Account</Heading>
        </Box>
        <VStack
          space={5}
          flex={1}
          borderTopRadius={50}
          backgroundColor="white"
          paddingY={10}
          paddingX={3}
          shadow={5}
        >
          {credentials.isAnonymous ? (
            <SaveAccountForm />
          ) : (
            <VStack space={5} flex={1}>
              {/* Account Info Start */}
              <AccountInfoForm />
              {/* Account Info End */}
              {/* Account Password Start */}
              <LoginInfoForm />
              {/* Account Password End */}
            </VStack>
          )}
        </VStack>
      </VStack>
    </Layout>
  );
};

export default EditAccount;
