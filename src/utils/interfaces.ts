export interface UserProp {
  id: string;
  name: string;
  email: string;
  sex: "male" | "female";
}

export interface QuestionProp {
  category: string;
  type: "multiple" | "boolean" | string;
  difficulty: "easy" | "medium" | "hard" | string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}
