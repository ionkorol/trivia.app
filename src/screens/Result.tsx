import React, { useCallback } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/core";
import { Layout, Logo } from "components/common";
import { Button } from "components/ui";
import { View, StyleSheet, Text } from "react-native";
import { connect } from "react-redux";
import { RootState } from "reduxx/store";
import { colors } from "style";
import { ResultsProp } from "utils/interfaces";
import * as gameActions from "reduxx/actions/gameActions";

interface Props {
  gameResults: ResultsProp | null;
  gameClearResults: typeof gameActions.clearResults;
}

const Result: React.FC<Props> = (props) => {
  const { gameResults, gameClearResults } = props;
  const totalQuestions = 10;
  const correctAnswers = 5;
  const score = 250;

  const nav = useNavigation();

  useFocusEffect(
    useCallback(() => {
      return () => gameClearResults();
    }, [])
  );

  return (
    <Layout>
      <View style={styles.container}>
        <Logo />
        <View style={styles.card}>
          <Text style={styles.headline}>Good Job</Text>
          <View style={styles.resultsContainer}>
            <View style={styles.result}>
              <Text style={styles.resultTitle}>SCORE</Text>
              <Text style={styles.resultValue}>
                {gameResults && gameResults.score}
              </Text>
            </View>
            <View style={{ ...styles.result, ...styles.bordered }}>
              <Text style={styles.resultTitle}>QUESTIONS</Text>
              <Text style={styles.resultValue}>
                {gameResults && gameResults.totalQuestions}
              </Text>
            </View>
            <View style={styles.result}>
              <Text style={styles.resultTitle}>CORRECT</Text>
              <Text style={styles.resultValue}>
                {gameResults && gameResults.correctAnswers}
              </Text>
            </View>
          </View>
        </View>
        <Button onPress={() => nav.navigate("Main")}>Close</Button>
      </View>
    </Layout>
  );
};

const mapState = (state: RootState) => ({
  gameResults: state.game.results,
});

const mapDispatch = {
  gameClearResults: gameActions.clearResults as any,
};

export default connect(mapState, mapDispatch)(Result);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    padding: 30,
  },
  card: {
    justifyContent: "space-around",
    alignItems: "stretch",
    height: "50%",
    backgroundColor: colors.light,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 20,
  },
  headline: {
    textAlign: "center",
    textTransform: "uppercase",
    fontSize: 30,
    fontWeight: "bold",
    color: colors.secondary,
  },
  resultsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  result: {
    flex: 1,
    alignItems: "center",
  },
  resultTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "gray",
  },
  resultValue: {
    fontSize: 25,
    fontWeight: "bold",
  },
  bordered: {
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderColor: "gray",
  },
});
