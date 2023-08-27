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
      setSelectedOption(null); // Reset the selected option when the component is unmounted
    };
  }, []);

  return (
    <div className="question">
      <h2>{data.questionText}</h2>
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
