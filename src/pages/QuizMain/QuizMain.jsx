import React, { useEffect, useState } from "react";
import Question from "../../components/TestComponents/Question";
import "./QuizMain.css";
const sampleQuestions = [
  {
    questionText: "What's the capital of France?",
    options: ["Paris", "Berlin", "Madrid", "Rome"],
    correctAnswer: "Paris",
  },
  {
    questionText:
      "What's the capital of Toshkent? lorem What's the capital of Toshkent? lorem What's the capital of Toshkent? lorem What's the capital of Toshkent? lorem",
    options: [
      "Toshkent",
      "What's the capital of Toshkent? lorem What's the capital of Toshkent? lorem Berlin",
      "Madrid",
      "Rome What's the capital of Toshkent? lorem What's the capital of Toshkent? lorem What's the capital of Toshkent? lorem What's the capital of Toshkent? lorem What's the capital of Toshkent? lorem",
    ],
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

function QuizMain() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(randomizedQuestions.length * 6000);

  useEffect(() => {
    if (timeLeft > 0 && currentQuestion < randomizedQuestions.length) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    } else if (timeLeft === 0) {
      console.log(answers);
      setCurrentQuestion(randomizedQuestions.length);
    }
  }, [timeLeft, currentQuestion, answers]);

  const handleAnswerOptionClick = (isCorrect, option) => {
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    setAnswers((prevAnswers) => {
      const existingAnswerIndex = prevAnswers.findIndex(
        (answer) =>
          answer.question === randomizedQuestions[currentQuestion].questionText
      );

      if (existingAnswerIndex !== -1) {
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[existingAnswerIndex] = {
          question: randomizedQuestions[currentQuestion].questionText,
          userAnswer: option,
          correctAnswer: randomizedQuestions[currentQuestion].correctAnswer,
        };
        return updatedAnswers;
      }

      return [
        ...prevAnswers,
        {
          question: randomizedQuestions[currentQuestion].questionText,
          userAnswer: option,
          correctAnswer: randomizedQuestions[currentQuestion].correctAnswer,
        },
      ];
    });
  };

  const handleNextButtonClick = () => {
    if (currentQuestion === randomizedQuestions.length - 1) {
      console.log(answers);
      setCurrentQuestion(randomizedQuestions.length);
    } else {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    }
  };

  if (currentQuestion === randomizedQuestions.length) {
    return (
      <div className="app">
        <div className="score-section">
          <h3>Your Score:</h3>
          <p>To`g`ri:{score}</p>
          <p>Xato:{randomizedQuestions.length - score}</p>
        </div>
        <ul>
          {answers.map((answer, index) => (
            <li key={index}>
              <strong>Savol:</strong> {answer.question} <br />
              <strong>Sizning javobingiz:</strong> {answer.userAnswer} <br />
              <strong>To`g`ri javob:</strong> {answer.correctAnswer}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="quiz_main_wrapper d-flex justify-content-center align-items-center">
      <div>
        <div className="d-flex justify-content-between">
          <div className="quiz_main_timer">
            Qolgan vaqt: {Math.floor(timeLeft / 60)}:
            {(timeLeft % 60).toString().padStart(2, "0")}
          </div>
          <div className="question-index text-end">
            <span className="badge bg-success">
              {currentQuestion + 1}/{randomizedQuestions.length}
            </span>
          </div>
        </div>
        <Question
          key={currentQuestion}
          data={randomizedQuestions[currentQuestion]}
          handleAnswerOptionClick={handleAnswerOptionClick}
        />
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-success bg-gradient px-5"
            onClick={handleNextButtonClick}
          >
            {currentQuestion === randomizedQuestions.length - 1
              ? "Testni yakunlash"
              : "Keyingi"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuizMain;
