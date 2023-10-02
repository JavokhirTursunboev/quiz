import { useGlobalContext } from "../App";
import { useState, useEffect } from "react";
import "../app.css";
const Trivia = () => {
  const { data, setStop, questionNumber, setQuestionNumber } =
    useGlobalContext();
  const [question, setQuestion] = useState(null);
  const [selectAnswer, setSelectAnswer] = useState(null);
  const [className, setClassName] = useState("answer");
  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
  }, [data, questionNumber]);

  const handleClick = (a) => {
    setSelectAnswer(a);
    setClassName("answer active");
  };

  return (
    <div className="trivia">
      <div className="questions">{question?.question}</div>
      <div className="answers">
        {question?.answers.map((a) => {
          return (
            <div
              className={selectAnswer === a ? className : "answer"}
              onClick={() => handleClick(a)}
            >
              {a.text}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Trivia;
