
export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export const quizQuestions: Question[] = [
  {
    id: 1,
    question: "What is React.js?",
    options: [
      "A JavaScript library for building user interfaces",
      "A programming language",
      "A database management system",
      "An operating system"
    ],
    correctAnswer: 0
  },
  {
    id: 2,
    question: "Which method is used to change state in React?",
    options: [
      "changeState()",
      "setState()",
      "modifyState()",
      "updateState()"
    ],
    correctAnswer: 1
  },
  {
    id: 3,
    question: "What is JSX?",
    options: [
      "JavaScript XML",
      "Java Syntax Extension",
      "JSON XML",
      "JavaScript Extension"
    ],
    correctAnswer: 0
  },
  {
    id: 4,
    question: "What is the virtual DOM?",
    options: [
      "A direct copy of the actual DOM",
      "A lightweight copy of the actual DOM",
      "A programming concept",
      "A browser feature"
    ],
    correctAnswer: 1
  },
  {
    id: 5,
    question: "What hook is used for side effects in React?",
    options: [
      "useEffect",
      "useState",
      "useContext",
      "useReducer"
    ],
    correctAnswer: 0
  }
];
