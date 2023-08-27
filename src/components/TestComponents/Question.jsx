import React, { useEffect, useState } from "react";
import Option from "./Option";

function Question({ data, handleAnswerOptionClick }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (option, isCorrect) => {
    setSelectedOption(option);
    handleAnswerOptionClick(isCorrect, option);
  };

  useEffect(() => {
    return () => {
      setSelectedOption(null);
    };
  }, []);

  return (
    <div className="quiz_question">
      <h3 className="mb-4">{data.questionText}</h3>
      {data.options.map((option, index) => (
        <Option
          key={index}
          text={option}
          name="quiz-option"
          isChecked={selectedOption === option}
          onChange={() =>
            handleOptionChange(option, option === data.correctAnswer)
          }
        />
      ))}
    </div>
  );
}

export default Question;
