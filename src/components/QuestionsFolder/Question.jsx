import { useContext, useRef, useState } from "react";
import { ContextValue } from "../../store/Contextprovider";
import ErrorMessage from "./ErrorMessage";
import styles from "./Question.module.css";
import { IoBulbOutline } from "react-icons/io5";

const Question = () => {
  const [answer, setAnswer] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  const {
    data,
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
    DEFAULTSECOND,
  } = useContext(ContextValue);
  const [hint, SetHint] = useState(false);
  const [visibleHint, SetVisibleHint] = useState(true);

  const [userAnswer, setUserAnswer] = useState("");
  const [isChecked, setIsChecked] = useState(DEFAULTVALUE);
  const inputAnswer = useRef();

  const handelHint = () => {
    SetVisibleHint(false);
    // SetHint(true);
    setUserAnswer("");
    setSeconds(10);
    console.log("Hint Button Has Benn Clicked", hint);
    setErrorMessage(false);
  };

  const handelSubmit = (event) => {
    console.log("submint button has been clciked ");
    SetVisibleHint(true);
    event.preventDefault();

    const selectedOption = data.quiz[random].options.filter(
      (option, index) => isChecked[index]
    );

    if (seconds >= 10 && hint === false) {
      if (
        userAnswer.toLocaleLowerCase() ===
        data.quiz[random].answer.toLocaleLowerCase()
      ) {
        console.log("this is the answer");

        setPoints(points + 1);
        setRandom(randomInteger);
        setSeconds(DEFAULTSECOND);
        setUserAnswer("");
      } else if (
        userAnswer.toLocaleLowerCase() !==
          data.quiz[random].answer.toLocaleLowerCase() &&
        userAnswer !== ""
      ) {
        setAnswer(data.quiz[random].answer);
        setGameOver(true);
        setIsChecked(DEFAULTVALUE);
        setSeconds(DEFAULTSECOND);
        setUserAnswer("");
      } else if (userAnswer === "") {
        setErrorMessage(true);
      }
    } else {
      if (isChecked.some((checked) => checked)) {
        selectedOption.map((item, index) => {
          if (item === data.quiz[random].answer) {
            setPoints(points + 1);
            setIsChecked(DEFAULTVALUE);
            setRandom(randomInteger);
            setSeconds(DEFAULTSECOND);
            SetHint(false);
          } else {
            setAnswer(data.quiz[random].answer);
            setGameOver(true);
            setIsChecked(DEFAULTVALUE);
            setSeconds(DEFAULTSECOND);
            SetHint(false);
          }
        });
      } else {
      }
    }
  };

  const handelSelect = (index) => {
    const updatedCheck = isChecked.map((item, inx) => inx === index);
    setIsChecked(updatedCheck);
  };

  const handelRestartGame = () => {
    SetHint(false);
    setGameOver(false);
    setPoints(0);
    setRandom(randomInteger);
    setSeconds(30);
    inputAnswer.current.focus();
    setErrorMessage(false);
    SetVisibleHint(true);
  };

  const handelAnswerChange = (event) => {
    setUserAnswer(event.target.value);
    console.log(event.target.value, "This is user Answer");
  };

  return (
    <>
      <div className={styles.main_container}>
        {gameOver || seconds === 0 ? (
          <>
            <div className={styles.gameOver}>
              <h1>GAME OVER</h1>
              <h5>Your Final Point Is {points}</h5>
              <h5>{answer}</h5>
              <button onClick={handelRestartGame}>Restart</button>
            </div>
          </>
        ) : (
          <div
            className={styles.quiz_container}
            style={{
              color: seconds <= 10 && seconds % 2 === 0 ? "darkred" : "black",
            }}
          >
            <h5 className={styles.points}> Score : {points}</h5>
            <h2 className={styles.seconds}>{seconds}</h2>

            {data.quiz[random] && (
              <>
                <form onSubmit={handelSubmit}>
                  {seconds > 10 && !hint ? inputAnswer.current?.focus() : null}
                  <div className={styles.quiz_area}>
                    <h2>{data.quiz[random].question}</h2>
                    {seconds <= 10 || hint ? (
                      <ul className={styles.list_container}>
                        {data.quiz[random].options.map((option, index) => (
                          <li key={index} className={styles.option}>
                            <button
                              onClick={() => handelSelect(index)}
                              className={styles.optionbtn}
                            >
                              {option}
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div>
                        {errorMessage && <ErrorMessage></ErrorMessage>}
                        <input
                          type="text"
                          value={userAnswer}
                          ref={inputAnswer}
                          onChange={handelAnswerChange}
                          className={styles.inputbox}
                        />
                      </div>
                    )}
                  </div>

                  <div className={styles.btn_container}>
                    <button type="submit">check</button>
                  </div>
                </form>
                <div>
                  {seconds > 10 && (
                    <div>
                      <p className={styles.note}>
                        NOTE : Clicking <IoBulbOutline /> Will Reduce the Time
                        To 10 sec
                      </p>
                      <button
                        type="text"
                        onClick={handelHint}
                        className={styles.iconbtn}
                      >
                        <IoBulbOutline className={styles.icon} />
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Question;
