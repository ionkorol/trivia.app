export interface UserProp {
  id: string;
  name: string;
  email: string;
  points: number;
  rank: {
    current: number | null;
    change: number;
  };
}

export interface QuestionProp {
  category: string;
  type: "multiple" | "boolean" | string;
  difficulty: "easy" | "medium" | "hard" | string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface ResultsProp {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
}
