import { Layout } from "components/common";
import {
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  IconButton,
  Menu,
  VStack,
} from "native-base";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { useAppSelector } from "reduxx/store";
import { useNavigation } from "@react-navigation/core";
import { TouchableOpacity } from "react-native-gesture-handler";
import { signout } from "lib/user";

const Account = () => {
  const nav = useNavigation();
  const userData = useAppSelector((state) => state.user.data!);

  return (
    <Layout>
      <VStack flex={1}>
        <VStack space={5} paddingX={5} paddingTop={5} paddingBottom={10}>
          <HStack justifyContent="space-between">
            <IconButton
              icon={<Icon as={FontAwesome5} name="arrow-left" />}
              onPress={nav.goBack}
            />
            <Menu
              backgroundColor="white"
              border={0}
              trigger={(triggerProps) => {
                return (
                  <IconButton
                    {...triggerProps}
                    icon={<Icon as={FontAwesome5} name="ellipsis-h" />}
                  />
                );
              }}
            >
              <Menu.Item _text={{ color: "black" }} onPress={signout}>
                Sign Out
              </Menu.Item>
            </Menu>
          </HStack>
          <HStack space={3} alignItems="center">
            <Box backgroundColor="white" padding={3} borderRadius={50}>
              <Icon as={FontAwesome5} name="user-alt" color="primary.500" />
            </Box>
            <Heading adjustsFontSizeToFit numberOfLines={1} flex={1}>
              {userData.name}
            </Heading>
          </HStack>
          <Button
            variant="outline"
            size="sm"
            startIcon={<Icon as={FontAwesome5} name="user-edit" size="xs" />}
            onPress={() => nav.navigate("EditAccount")}
          >
            Edit Profile
          </Button>
        </VStack>
        <VStack
          flex={1}
          paddingX={5}
          paddingTop={10}
          backgroundColor="white"
          borderTopRadius={50}
          space={5}
          shadow={5}
        >
          {/* Start of All Stats */}
          <HStack
            backgroundColor="rose.400"
            padding={3}
            borderRadius={100}
            space={3}
          >
            <Box backgroundColor="white" padding={2} borderRadius={50}>
              <Icon
                as={FontAwesome5}
                name="chart-pie"
                color="rose.500"
                size="xs"
              />
            </Box>
            <Heading flex={1} size="md">
              See full statistics
            </Heading>
          </HStack>
          {/* End of All Stats */}
          {/* Start of Points */}
          <HStack
            backgroundColor="amber.400"
            padding={3}
            borderRadius={100}
            space={3}
          >
            <Box backgroundColor="white" padding={2} borderRadius={50}>
              <Icon
                as={FontAwesome5}
                name="star-of-life"
                color="amber.500"
                size="xs"
              />
            </Box>
            <Heading flex={1} size="md">
              Points
            </Heading>
            <Heading size="md">{userData.points}</Heading>
          </HStack>
          {/* End of points */}
          {/* Start of Ranking */}
          <TouchableOpacity onPress={() => nav.navigate("LeaderBoard")}>
            <HStack
              backgroundColor="green.400"
              padding={3}
              borderRadius={100}
              space={3}
            >
              <Box backgroundColor="white" padding={2} borderRadius={50}>
                <Icon
                  as={FontAwesome5}
                  name="signal"
                  color="green.500"
                  size="xs"
                />
              </Box>
              <Heading flex={1} size="md">
                Ranking
              </Heading>
              <Heading size="md">{userData.rank.current}</Heading>
            </HStack>
          </TouchableOpacity>
          {/* End of Ranking */}
          {/* Start of Ranking change */}
          <TouchableOpacity>
            <HStack
              backgroundColor="cyan.400"
              padding={3}
              borderRadius={100}
              space={3}
            >
              <Box backgroundColor="white" padding={2} borderRadius={50}>
                <Icon
                  as={FontAwesome5}
                  name="sort"
                  color="cyan.500"
                  size="xs"
                  textAlign="center"
                />
              </Box>
              <Heading flex={1} size="md">
                Ranking change
              </Heading>
              <Heading size="md">{Math.abs(userData.rank.change)}</Heading>
              <Icon
                as={FontAwesome5}
                textAlign="center"
                color={
                  userData.rank.change > 0
                    ? "green.500"
                    : userData.rank.change < 0
                    ? "red.500"
                    : "gray.400"
                }
                name={
                  userData.rank.change > 0
                    ? "caret-up"
                    : userData.rank.change < 0
                    ? "caret-down"
                    : "times"
                }
              />
            </HStack>
          </TouchableOpacity>
          {/* End of Ranking change */}
        </VStack>
      </VStack>
    </Layout>
  );
};

export default Account;
