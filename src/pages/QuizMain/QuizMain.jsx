import React, { useEffect, useState } from "react";
import Question from "../../components/TestComponents/Question";
import "./QuizMain.css";
import axios from "axios";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function transformData(data) {
  return data.map((item) => {
    const options = [
      item.answer_1,
      item.answer_2,
      item.answer_3,
      item.correct_answer,
    ];
    return {
      questionText: item.question,
      questionImage: item.image,
      options: shuffleArray(options),
      correctAnswer: item.correct_answer,
    };
  });
}

function QuizMain() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [quizDatas, setQuizDatas] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const isUserLogin = sessionStorage.getItem("enus");

  const userFan = localStorage.getItem("fan");
  const fetchQuiz = () => {
    const apiUrl = `https://api.abdullajonov.uz/training-test-api/api/v1/${isUserLogin}/test/listbycategory/${userFan}`;
    axios.post(apiUrl).then((res) => {
      const aralash = apiUrl.split("/").slice(-1).join("/");
      const combinedData = [].concat(
        aralash == "mixed" ? [...res.data.tests] : [...res.data]
      );
      const transformedArray = combinedData.flatMap((subArray) => subArray);
      const transformedData = transformData(
        aralash == "mixed" ? transformedArray : res.data
      );
      setQuizDatas(transformedData);
      setTimeLeft(transformedData.length * 60);
    });
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && currentQuestion < quizDatas.length) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    } else if (timeLeft === 0) {
      setCurrentQuestion(quizDatas.length);
    }
  }, [quizDatas, currentQuestion, answers, timeLeft]);

  const handleAnswerOptionClick = (isCorrect, option) => {
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    setAnswers((prevAnswers) => {
      const existingAnswerIndex = prevAnswers.findIndex(
        (answer) => answer.question === quizDatas[currentQuestion].questionText
      );

      if (existingAnswerIndex !== -1) {
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[existingAnswerIndex] = {
          question: quizDatas[currentQuestion].questionText,
          userAnswer: option,
          correctAnswer: quizDatas[currentQuestion].correctAnswer,
        };
        return updatedAnswers;
      }

      return [
        ...prevAnswers,
        {
          question: quizDatas[currentQuestion].questionText,
          userAnswer: option,
          correctAnswer: quizDatas[currentQuestion].correctAnswer,
        },
      ];
    });
  };

  const handleNextButtonClick = () => {
    if (currentQuestion === quizDatas.length - 1) {
      setCurrentQuestion(quizDatas.length);
    } else {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    }
  };

  if (currentQuestion === quizDatas.length) {
    return (
      <div className="quiz_main_results">
        <div className="d-flex align-items-center justify-content-center gap-1">
          <h2 className="text-center">Sizning natijangiz:</h2>
          <div className="quiz_main_stats">
            <span className="text-white bg-success bg-gradient rounded-top">
              To`g`ri:{score}
            </span>
            <span className="text-white bg-danger bg-gradient rounded-bottom">
              Xato:{quizDatas.length - score}
            </span>
          </div>
          <span className="btn btn-outline-danger">{score * 2}</span>
        </div>
        <ul>
          {answers.map((answer, index) => (
            <li key={index}>
              <h3>Savol: {answer.question}</h3>
              {answer.userAnswer == answer.correctAnswer ? (
                <span className="bg-success px-4 py-2 text-white rounded">
                  {answer.userAnswer}{" "}
                  <i className="fa-solid fa-circle-check fa-3x p-3"></i>
                </span>
              ) : (
                <div className="checking_answer text-white">
                  <span className="bg-danger bg-gradient px-4 py-2 rounded-start">
                    {answer.userAnswer}{" "}
                    <i className="fa-sharp fa-solid fa-circle-exclamation fa-3x p-3"></i>
                  </span>
                  <span className="bg-success bg-gradient px-4 py-2 rounded-end">
                    {answer.correctAnswer}{" "}
                    <i className="fa-solid fa-circle-check fa-3x p-3"></i>
                  </span>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // console.log(quizDatas);

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
              {currentQuestion + 1}/{quizDatas.length}
            </span>
          </div>
        </div>
        <Question
          key={currentQuestion}
          data={quizDatas[currentQuestion]}
          handleAnswerOptionClick={handleAnswerOptionClick}
        />
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-success bg-gradient px-5"
            onClick={handleNextButtonClick}
          >
            {currentQuestion === quizDatas.length - 1
              ? "Testni yakunlash"
              : "Keyingi"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuizMain;
