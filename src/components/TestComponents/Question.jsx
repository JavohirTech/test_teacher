import PropTypes from "prop-types";
import { useEffect, useState } from "react";
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
      <div className="text-center">
        {data.questionImage !== null ? (
          <img
            src={
              "https://api.abdullajonov.uz/training-test-api/public/storage/images/" +
              data.questionImage
            }
            className="p-2"
            style={{ width: "80%", objectFit: "cover" }}
          />
        ) : null}
      </div>

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

Question.propTypes = {
  data: PropTypes.object.isRequired,
  handleAnswerOptionClick: PropTypes.func.isRequired,
};
