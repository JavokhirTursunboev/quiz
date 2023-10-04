import { useGlobalContext } from "../App";
import { useState, useEffect } from "react";
import "../app.css";
import useSound from "use-sound";
import play from "../assets/music/play.wav";
import correct from "../assets/music/correct.wav";
import wrong from "../assets/music/wrong.wav";


const Trivia = () => {
  const { data, setStop, questionNumber, setQuestionNumber } =
    useGlobalContext();
  const [question, setQuestion] = useState(null);
  const [selectAnswer, setSelectAnswer] = useState(null);
  const [className, setClassName] = useState("answer");
  //  sounds
  const [letPlay] = useSound(play);
  const [correctAnswer] = useSound(correct);
  const [wrongAnswer] = useSound(wrong);


  useEffect(() => {
    letPlay();
  }, [letPlay]);

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
    delay(5000, () => {
      if (a.correct) {
        correctAnswer();
        delay(1000, () => {
          setQuestionNumber((prev) => prev + 1);
          setSelectAnswer(null);
        });
      } else {
        wrongAnswer();
        delay(1000, () => {
          setStop(true);
        });
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
