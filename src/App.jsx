import { useMemo } from "react";
import { useState, useContext, createContext, useEffect } from "react";
import "./app.css";
import Start from "./components/Start";
import Timer from "./components/Timer";
import Trivia from "./components/Trivia";
import { data } from "./data";
import backg from "./assets/img/bg.jpg";
// context api

const apiContext = createContext();
export const useGlobalContext = () => useContext(apiContext);
function App() {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [earn, setEarn] = useState("$ 0");
  const [user, setUser] = useState(null);
  const [showLeft, setShowLeft] = useState(false);
  const moneyPyramid = useMemo(
    () =>
      [
        { id: 1, amount: "$ 100" },
        { id: 2, amount: "$ 200" },
        { id: 3, amount: "$ 300" },
        { id: 4, amount: "$ 500" },
        { id: 5, amount: "$ 1.000" },
        { id: 6, amount: "$ 2.000" },
        { id: 7, amount: "$ 4.000" },
        { id: 8, amount: "$ 8.000" },
        { id: 9, amount: "$ 16.000" },
        { id: 10, amount: "$ 32.000" },
        { id: 11, amount: "$ 64.000" },
        { id: 12, amount: "$ 125.000" },
        { id: 13, amount: "$ 250.000" },
        { id: 14, amount: "$ 500.000" },
        { id: 15, amount: "$ 1.000.000" },
      ].reverse(),
    []
  );

  useEffect(() => {
    questionNumber > 1 &&
      setEarn(moneyPyramid.find((m) => m.id === questionNumber - 1).amount);
  });

  const handleSide = () => {
    setShowLeft(!showLeft);
  };
  return (
    <apiContext.Provider
      value={{ data, setStop, questionNumber, setQuestionNumber, setUser }}
    >
      <div className="app">
        {user ? (
          <>
            <div className="main">
              {stop ? (
                <h1 className="earnText">
                  {user.toUpperCase()} eared: {earn}
                </h1>
              ) : (
                <>
                  <div className="top">
                    <div className="mobileButton" onClick={handleSide}>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <div className="timer">
                      <Timer />
                    </div>
                  </div>
                  <div className="bottom">
                    <Trivia />
                  </div>
                </>
              )}
            </div>
            {showLeft && (
              <div className="pyramid">
                <button className="exit" onClick={() => setShowLeft(false)}>
                  x
                </button>
                <ul className="moneyList">
                  {moneyPyramid.map((m) => {
                    return (
                      <li
                        key={m.id}
                        className={
                          questionNumber === m.id
                            ? "moneyListItem active"
                            : "moneyListItem"
                        }
                      >
                        <span className="moneyListItemNumber">{m.id}</span>
                        <span className="moneyListItemAmount">{m.amount}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </>
        ) : (
          <Start />
        )}
      </div>
    </apiContext.Provider>
  );
}

export default App;
