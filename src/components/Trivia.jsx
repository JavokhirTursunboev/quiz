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

  // deley function
  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  const handleClick = (a) => {
    setSelectAnswer(a);
    setClassName("answer active");
    // deley

    delay(3000, () =>
      setClassName(a.correct ? "answer correct" : "answer wrong")
    );

    // change question
    delay(6000, () => {
      if (a.correct) {
        setQuestionNumber((prev) => prev + 1);
        setSelectAnswer(null);
      } else {
        setStop(true);
      }
    });
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
