import { Layout } from "components/common";
import firebase from "firebase";
import {
  Box,
  Heading,
  HStack,
  VStack,
  Text,
  IconButton,
  Icon,
  FlatList,
} from "native-base";
import React, { useCallback, useState } from "react";
import { useAppSelector } from "reduxx/store";
import { UserProp } from "utils/interfaces";
import { FontAwesome5 } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/core";

const LeaderBoard = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<UserProp[]>([]);
  const userData = useAppSelector((state) => state.user.data!);

  const nav = useNavigation();

  const getLeaders = async () => {
    setLoading(true);
    let rankRange = [];
    const currentRank = userData.rank.current;
    if (!currentRank) {
      rankRange = [1, 2, 3, 4];
    } else {
      if (currentRank === 1) {
        rankRange = [
          currentRank,
          currentRank + 1,
          currentRank + 2,
          currentRank + 3,
          currentRank + 4,
        ];
      } else if (currentRank === 2) {
        rankRange = [
          currentRank - 1,
          currentRank,
          currentRank + 1,
          currentRank + 2,
          currentRank + 3,
        ];
      } else {
        rankRange = [
          currentRank - 2,
          currentRank - 1,
          currentRank,
          currentRank + 1,
          currentRank + 2,
        ];
      }
    }
    const query = await firebase
      .firestore()
      .collection("users")
      .where("rank.current", "in", rankRange)
      .get();
    setUsers(query.docs.map((doc) => doc.data() as UserProp));
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      getLeaders();
    }, [])
  );

  return (
    <Layout>
      <VStack padding={3}>
        <IconButton
          alignSelf="flex-start"
          icon={<Icon as={FontAwesome5} name="arrow-left" />}
          onPress={() => nav.navigate("Home")}
        />
        <HStack space={5} alignItems="center" justifyContent="center">
          <Icon as={FontAwesome5} name="university" />
          <Heading>Leaderboard</Heading>
        </HStack>
      </VStack>
      <Box flex={1} borderTopRadius={50} backgroundColor="white" shadow={5}>
        <FlatList
          paddingY={20}
          paddingX={5}
          contentContainerStyle={{ flexGrow: 1 }}
          data={users.sort((a, b) => a.rank.current! - b.rank.current!)}
          renderItem={({ item }) => (
            <Box shadow={1}>
              <HStack
                marginY={3}
                paddingX={3}
                paddingY={2}
                borderWidth={2}
                borderColor="muted.300"
                borderRadius={50}
                alignItems="center"
                space={3}
                backgroundColor={
                  item.id === userData.id ? "primary.50" : undefined
                }
              >
                <Heading
                  size="md"
                  color={
                    item.rank.current === 1
                      ? "amber.500"
                      : item.rank.current === 2
                      ? "cyan.700"
                      : item.rank.current === 3
                      ? "amber.700"
                      : "muted.500"
                  }
                >
                  {item.rank.current}
                </Heading>
                <Text
                  flex={1}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  color="black"
                >
                  {item.name}
                </Text>
                <Text color="black">({item.points})</Text>
                <Text
                  color={
                    item.points > 0
                      ? "green.500"
                      : item.points < 0
                      ? "red.500"
                      : "muted.500"
                  }
                >
                  {item.rank.change > 0
                    ? `+${item.rank.change}`
                    : item.rank.change}
                </Text>
              </HStack>
            </Box>
          )}
          keyExtractor={(item) => item.id}
          onRefresh={getLeaders}
          refreshing={loading}
          ListFooterComponent={
            userData.rank.current ? undefined : (
              <Box shadow={1}>
                <HStack
                  marginY={3}
                  paddingX={3}
                  paddingY={2}
                  borderWidth={2}
                  borderColor="muted.300"
                  borderRadius={50}
                  alignItems="center"
                  space={3}
                  backgroundColor="primary.50"
                >
                  <Text numberOfLines={1} adjustsFontSizeToFit color="black">
                    {userData.name}
                  </Text>

                  <Text color="black" flex={1}>
                    ({userData.points})
                  </Text>
                  <Heading size="xs" color="muted.500">
                    Unranked
                  </Heading>
                </HStack>
              </Box>
            )
          }
        />
      </Box>
    </Layout>
  );
};

export default LeaderBoard;
