import { useFocusEffect, useNavigation } from "@react-navigation/core";
import { Button } from "components/ui";
import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import { colors } from "style";
import { shuffle } from "utils/functions";
import { QuestionProp } from "utils/interfaces";
import questionsJson from "utils/questions.json";

interface Props {}

const Game: React.FC<Props> = () => {
  const [questions, setQuestions] = useState<QuestionProp[] | null>(null);
  const [question, setQuestion] = useState<QuestionProp | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);

  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);

  const [points, setPoints] = useState(0);
  const [timer, setTimer] = useState(20);
  const [timerObj, setTimerObj] = useState<NodeJS.Timeout | null>(null);

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const nav = useNavigation();

  // Get Questions and set first question
  const getQuestions = async () => {
    const res = await fetch(
      "https://opentdb.com/api.php?amount=10&encode=url3986"
    );
    const data = await res.json();
    setQuestions(data.results);
    setQuestion(data.results[currentQuestionNumber]);
  };

  // Handle next question button
  const nextQuestion = () => {
    if (!selectedAnswer) {
      Alert.alert("No answer selected");
      return;
    }

    if (currentQuestionNumber === questions?.length) {
      nav.navigate("Main");
      return;
    }
    setSelectedAnswer(null);
    setQuestion(questions![currentQuestionNumber]);
  };

  // Handle select answer
  const acceptAnswer = (answer: string) => {
    if (!selectedAnswer) {
      setSelectedAnswer(answer);
      if (question?.correct_answer.includes(answer)) {
        setPoints((prevState) => prevState + timer);
      }
    }
  };

  // On Question change:
  // Set answers
  // Increase question number
  // Reset timer
  // Set timer object
  useEffect(() => {
    if (question) {
      setAnswers(
        shuffle([...question.incorrect_answers, question.correct_answer])
      );
      setCurrentQuestionNumber((prevState) => prevState + 1);
      setTimer(20);
      // Handle timer
      setTimerObj(
        setInterval(() => setTimer((prevState) => prevState - 1), 1000)
      );
    }
  }, [question]);

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
      getQuestions();
      return () => {
        setQuestions(null);
        setQuestion(null);
        setSelectedAnswer(null);
        setCurrentQuestionNumber(0);
        setPoints(0);
        if (timerObj) {
          clearInterval(timerObj);
        }
      };
    }, [])
  );

  // If timer runs out set a wrong question
  useEffect(() => {
    if (timer <= 0) {
      setSelectedAnswer(question?.incorrect_answers[0]!);
    }
  }, [timer]);

  // If no questions or question
  if (!questions || !question) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <View>
          <Text style={styles.textLight}>SCORE: {points}</Text>
        </View>
        <View>
          <Text style={styles.textLight}>
            Question: {currentQuestionNumber}/{questions.length}
          </Text>
        </View>
      </View>
      <View style={styles.time}>
        <Text style={{ ...styles.textLight, fontSize: 40 }}>{timer}</Text>
      </View>
      <View style={styles.question}>
        <Text
          adjustsFontSizeToFit
          minimumFontScale={0.1}
          numberOfLines={4}
          style={{
            ...styles.textLight,
            textAlign: "center",
          }}
        >
          {decodeURIComponent(question.question)}
        </Text>
      </View>
      <View style={styles.answers}>
        {answers.map((answer, index) => (
          <TouchableOpacity
            onPress={() => acceptAnswer(answer)}
            style={{
              ...styles.answer,
              backgroundColor: !selectedAnswer
                ? undefined
                : selectedAnswer === answer &&
                  question.incorrect_answers.includes(answer)
                ? colors.warning
                : answer === question.correct_answer
                ? colors.success
                : colors.danger,
            }}
            key={index}
          >
            <Text
              adjustsFontSizeToFit
              minimumFontScale={0.1}
              numberOfLines={1}
              style={styles.textLight}
            >
              {decodeURIComponent(answer)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Button disabled={!selectedAnswer} onPress={nextQuestion}>
        Next
      </Button>
    </View>
  );
};

export default Game;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 30,
    backgroundColor: colors.primary,
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  time: {
    alignItems: "center",
    paddingVertical: 20,
  },
  question: {
    flex: 1,
    borderWidth: 3,
    borderColor: colors.light,
    padding: 20,
    borderRadius: 10,
    alignItems: "stretch",
  },
  answers: {
    flex: 3,
    justifyContent: "space-evenly",
  },
  answer: {
    borderWidth: 3,
    borderColor: colors.light,
    padding: 15,
    borderRadius: 10,
  },
  textLight: {
    color: colors.light,
    fontSize: 20,
    fontWeight: "bold",
  },
});
