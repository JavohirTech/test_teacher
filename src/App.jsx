import React, { useState } from "react";
import Question from "./components/Question";

const sampleQuestions = [
  {
    questionText: "What's the capital of France?",
    options: ["Paris", "Berlin", "Madrid", "Rome"],
    correctAnswer: "Paris",
  },
  {
    questionText: "What's the capital of Toshkent?",
    options: ["Toshkent", "Berlin", "Madrid", "Rome"],
    correctAnswer: "Toshkent",
  },
];

function shuffleArray(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

const randomizedQuestions = shuffleArray([...sampleQuestions]);
randomizedQuestions.forEach((question) => {
  question.options = shuffleArray([...question.options]);
});

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleAnswerOptionClick = (isCorrect, option) => {
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
    setAnswers((prevAnswers) => [
      ...prevAnswers,
      {
        question: randomizedQuestions[currentQuestion].questionText,
        userAnswer: option,
        correctAnswer: randomizedQuestions[currentQuestion].correctAnswer,
      },
    ]);
  };

  const handleNextButtonClick = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  };

  if (currentQuestion === randomizedQuestions.length) {
    return (
      <div className="app">
        <h2>Quiz Summary</h2>
        <div className="score-section">
          <h3>Your Score:</h3>
          <p>
            {score} out of {randomizedQuestions.length}
          </p>
        </div>
        <ul>
          {answers.map((answer, index) => (
            <li key={index}>
              <strong>Question:</strong> {answer.question} <br />
              <strong>Your Answer:</strong> {answer.userAnswer} <br />
              <strong>Correct Answer:</strong> {answer.correctAnswer}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="app">
      <Question
        key={currentQuestion}
        data={randomizedQuestions[currentQuestion]}
        handleAnswerOptionClick={handleAnswerOptionClick}
      />
      <button onClick={handleNextButtonClick}>
        {currentQuestion === randomizedQuestions.length - 1
          ? "Finish Exam"
          : "Next"}
      </button>
    </div>
  );
}

export default App;
