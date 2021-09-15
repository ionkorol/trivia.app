import { useFocusEffect, useNavigation } from "@react-navigation/core";
import { Layout } from "components/common";
import React, { useCallback, useEffect, useState } from "react";
import { shuffle } from "utils/functions";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Button,
  Center,
  HStack,
  Spinner,
  VStack,
  Text,
  Heading,
  Icon,
} from "native-base";
import { Alert } from "react-native";
import {
  incrementCorrectAnswers,
  incrementScore,
} from "reduxx/slices/gameSlice/resultSlice";
import { useAppDispatch, useAppSelector } from "reduxx/store";
import {
  clearQuestion,
  setQuestion,
} from "reduxx/slices/gameSlice/questionSlice";
import {
  clearQuestions,
  readGameQuestions,
} from "reduxx/slices/gameSlice/questionsSlice";

interface Props {}
const Game: React.FC<Props> = (props) => {
  const { question, questions, result } = useAppSelector((state) => state.game);
  
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);

  const [timer, setTimer] = useState(20);
  const [timerObj, setTimerObj] = useState<NodeJS.Timer | null>(null);

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  // const [correctAnswers, setCorrectAnswers] = useState<number>(0);

  const dispatch = useAppDispatch();

  const nav = useNavigation();

  // Get Questions and set first question
  // const getQuestions = async () => {
  //   const res = await fetch(
  //     "https://opentdb.com/api.php?amount=10&encode=url3986&type=multiple"
  //   );
  //   const data = await res.json();
  //   setQuestions(data.results);
  //   setQuestion(data.results[currentQuestionNumber]);
  // };

  // Handle next question button
  const nextQuestion = () => {
    if (!selectedAnswer) {
      Alert.alert("No answer selected");
      return;
    }

    if (currentQuestionNumber === questions.data.length) {
      nav.navigate("Result");
      return;
    }
    setSelectedAnswer(null);
    dispatch(setQuestion(questions.data![currentQuestionNumber]));
  };

  // Handle select answer
  const acceptAnswer = (answer: string) => {
    if (selectedAnswer) {
      return;
    }

    setSelectedAnswer(answer);

    if (question.data!.correct_answer.includes(answer)) {
      dispatch(incrementScore(timer));
      dispatch(incrementCorrectAnswers());
    }

    // Set Result TODO: Somewhere else
    // dispatch(setTotalQuestions(questions.data.length));
  };

  useEffect(() => {
    if (questions.data.length && !question.data) {
      dispatch(setQuestion(questions.data[0]));
    }
  }, [questions.data]);

  // On Question change:
  // Set answers
  // Increase question number
  // Reset timer
  // Set timer object
  useEffect(() => {
    if (question.data) {
      setCurrentQuestionNumber((prevState) => prevState + 1);
      setTimer(20);
      // Handle timer
      setTimerObj(
        setInterval(() => setTimer((prevState) => prevState - 1), 1000)
      );
      setOptions(
        shuffle([
          ...question.data.incorrect_answers,
          question.data.correct_answer,
        ])
      );
    }
  }, [question.data]);

  // Stop timer after answer selection
  useEffect(() => {
    if (selectedAnswer && timerObj) {
      clearInterval(timerObj);
      setTimerObj(null);
    }
  }, [selectedAnswer, timerObj]);

  // Get questions at mount
  // Reset state on exit
  useFocusEffect(
    useCallback(() => {
      dispatch(readGameQuestions() as any);
      return () => {
        dispatch(clearQuestions());
        dispatch(clearQuestion());
        setSelectedAnswer(null);
        setCurrentQuestionNumber(0);
        if (timerObj) {
          clearInterval(timerObj);
        }
      };
    }, [])
  );

  // If timer runs out set a wrong question
  useEffect(() => {
    if (timer <= 0) {
      setSelectedAnswer(question.data!.incorrect_answers[0]);
    }
  }, [timer]);

  // If no questions or question
  if (!questions.data.length || !question.data) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }
  return (
    <Layout>
      <VStack flex={1}>
        <HStack justifyContent="space-between" alignItems="center" padding={5}>
          <VStack alignItems="center">
            <Text>{result.score}</Text>
            <Text>Score</Text>
          </VStack>
          <Heading>{timer}</Heading>

          <VStack alignItems="center">
            <Text>
              {currentQuestionNumber}/{questions.data.length}
            </Text>
            <Text>Question</Text>
          </VStack>
        </HStack>

        <VStack
          backgroundColor="white"
          flex={1}
          padding={5}
          borderTopRadius={50}
          shadow={5}
        >
          <Center padding={5}>
            <Icon
              as={MaterialCommunityIcons}
              name="owl"
              color="primary.300"
              size="lg"
            />
            <Heading
              size="md"
              textAlign="center"
              adjustsFontSizeToFit
              minimumFontScale={0.1}
              numberOfLines={3}
              color="black"
            >
              {decodeURIComponent(question.data.question)}
            </Heading>
          </Center>
          <VStack flex={1} space={3} paddingY={3} justifyContent="flex-end">
            {options.map((answer, index) => (
              <Button
                variant={!selectedAnswer ? "outline" : "solid"}
                onPress={() => acceptAnswer(answer)}
                size="md"
                colorScheme={
                  selectedAnswer
                    ? selectedAnswer === answer
                      ? question.data!.correct_answer === answer
                        ? "green"
                        : "red"
                      : question.data!.correct_answer === answer
                      ? "green"
                      : "blue"
                    : "primary"
                }
                key={index}
              >
                {decodeURIComponent(answer)}
              </Button>
            ))}
          </VStack>
          <Button disabled={!selectedAnswer} onPress={nextQuestion}>
            Next
          </Button>
        </VStack>
      </VStack>
    </Layout>
  );
};

export default Game;
