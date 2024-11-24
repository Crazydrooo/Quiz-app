import { useContext, useState } from "react";
import { ContextValue } from "../../store/Contextprovider";

const Question = () => {
  const { data, randomInteger } = useContext(ContextValue);

  console.log("This is random data", randomInteger);
  const [isChecked, setIsChecked] = useState(
    new Array(data.quiz[randomInteger].options.length).fill(false)
  );

  const handleCheckboxChange = (index) => {
    const updatedCheck = isChecked.map((item, inx) =>
      inx === index ? !item : item
    );

    setIsChecked(updatedCheck);

    console.log("This is the Final Check ", updatedCheck);
  };

  console.log("This is Is Check ", isChecked);
  const handelClick = (event) => {
    event.preventDefault();
    const selectedOption = data.quiz[randomInteger].options.filter(
      (option, index) => isChecked[index]
    );
    console.log("This is The Selected options ", selectedOption);

    console.log("This is The Answer ", data.quiz[randomInteger].answer);

    selectedOption.map((item) => {
      if (item === data.quiz[randomInteger].answer) {
        console.log("This thing is working ");
        randomInteger;
      }
    });
  };

  return (
    <>
      <div>
        {data.quiz.map((q, index) =>
          index === randomInteger ? (
            <form onSubmit={handelClick} key={index}>
              <div key={index}>
                <h3>{q.question}</h3>
                <ul>
                  {q.options.map((option, i) => (
                    <li key={i}>
                      <div onClick={() => handleCheckboxChange(i)}>
                        <div
                          style={{
                            height: "2rem",
                            width: "2rem",
                            backgroundColor:
                              isChecked === false ? "red" : "white",
                            border: "2px solid black",
                          }}
                        ></div>
                        {option}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <button onSubmit={handelClick}>check</button>
            </form>
          ) : null
        )}
      </div>
    </>
  );
};

export default Question;
