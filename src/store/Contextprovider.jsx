import { createContext, useEffect, useState } from "react";
import { questions } from "./quizQuestion";

export const ContextValue = createContext();

const Contextprovider = ({ children }) => {
  const [data, setData] = useState(questions);
  const [points, setPoints] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const randomInteger = Math.floor(Math.random() * data.quiz.length);
  const [random, setRandom] = useState(randomInteger);
  const [userAnswer, setUserAnswer] = useState("");

  const DEFAULTVALUE = new Array(data.quiz[random].options.length).fill(false);
  const DEFAULTSECOND = 30;

  const [seconds, setSeconds] = useState(DEFAULTSECOND);
  useEffect(() => {
    if (seconds > 0) {
      const timerId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [seconds]);

  return (
    <ContextValue.Provider
      value={{
        data,
        setData,
        randomInteger,
        random,
        setRandom,
        points,
        setPoints,
        gameOver,
        setGameOver,
        seconds,
        setSeconds,
        DEFAULTVALUE,
        userAnswer,
        setUserAnswer,
        DEFAULTSECOND,
      }}
    >
      {children}
    </ContextValue.Provider>
  );
};

export default Contextprovider;
