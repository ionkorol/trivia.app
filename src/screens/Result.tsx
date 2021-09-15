import React, { useCallback } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/core";
import { Layout, Logo } from "components/common";
import { useAppDispatch, useAppSelector } from "reduxx/store";
import {
  Button,
  VStack,
  Text,
  Heading,
  HStack,
  Box,
  Divider,
  Icon,
} from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";
import { clearResult } from "reduxx/slices/gameSlice/resultSlice";
import { addUserPoints } from "reduxx/slices/userSlice";

interface Props {}

const Result: React.FC<Props> = (props) => {
  const userData = useAppSelector((state) => state.user.data!);

  const { score, totalQuestions, correctAnswers } = useAppSelector(
    (state) => state.game.result
  );
  const dispatch = useAppDispatch();
  const nav = useNavigation();

  useFocusEffect(
    useCallback(() => {
      dispatch(addUserPoints(score) as any);
      return () => dispatch(clearResult());
    }, [])
  );

  return (
    <Layout>
      <VStack flex={1}>
        <VStack space={5} alignItems="center" flex={1} padding={5}>
          <Logo />
          <VStack alignItems="center">
            <Box backgroundColor="white" padding={2} borderRadius={50}>
              <Icon as={FontAwesome5} name="user-alt" color="primary.500" />
            </Box>
            <Heading size="sm">{userData && userData.name}</Heading>
          </VStack>
          <HStack
            justifyContent="space-evenly"
            divider={<Divider bgColor="muted.200" />}
          >
            <VStack flex={1} paddingX={2} alignItems="center">
              <Heading>{score}</Heading>
              <Text>Total</Text>
              <Text>Score</Text>
            </VStack>
            <VStack flex={1} paddingX={2} alignItems="center">
              <Heading>{totalQuestions}</Heading>
              <Text>Total </Text>
              <Text>Questions</Text>
            </VStack>
            <VStack flex={1} paddingX={2} alignItems="center">
              <Heading>{correctAnswers}</Heading>
              <Text>Correct </Text>
              <Text>Answers</Text>
            </VStack>
          </HStack>
        </VStack>
        <VStack
          flex={1}
          backgroundColor="white"
          padding={10}
          borderTopRadius={50}
          space={10}
          shadow={5}
        >
          <Button
            startIcon={<Icon as={FontAwesome5} name="chart-pie" />}
            variant="outline"
            onPress={() => nav.navigate("Account")}
          >
            Personal Statistics
          </Button>
          <HStack space={3} justifyContent="center" alignItems="center">
            <Divider bgColor="muted.300" width={20} />
            <Text color="muted.300">OR</Text>
            <Divider bgColor="muted.300" width={20} />
          </HStack>
          <Button onPress={() => nav.navigate("Home")}>Home</Button>
        </VStack>
      </VStack>
    </Layout>
  );
};

export default Result;
