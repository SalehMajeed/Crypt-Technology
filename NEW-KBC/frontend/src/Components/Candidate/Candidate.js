import { useContext, useEffect, useState, useRef } from "react";
import SocketContext from "../../contexts/SocketContext";
import {
  Container,
  Pera,
  Question,
  CardWrapper,
  TimerCircle,
  Header,
  Button,
} from "./Candidate.styles.js";
import fiftyFiftyImg from "../assets/fifty_fifty.png";
import audiencePoll from "../assets/audience_poll.png";
import expertLifeLine from "../assets/ask_the_expert.png";

const Candidate = () => {
  const { socket, data } = useContext(SocketContext);
  console.log(data)
  const [questions, setQuestions] = useState({
    id: "2",
    question: "What is the capital of France?",
    options: {
      a: "Berlin",
      b: "Madrid",
      c: "Rome",
      d: "Paris",
    },
    correctAnswer: "d",
  });

  const moneyList = [
    { id: "1)", amount: "Rs. 500" },
    { id: "2)", amount: "Rs. 1,000" },
    { id: "3)", amount: "Rs. 2,000" },
    { id: "4)", amount: "Rs. 4,000" },
    { id: "5)", amount: "Rs. 7,000" },
    { id: "6)", amount: "Rs. 15,000" },
    { id: "7)", amount: "Rs. 21,000" },
  ].reverse();

  // console.log(data.startTimer);

  useEffect(() => {
    if (socket) {
      socket.emit("connect-candidate");
    }
  }, [socket]);

  const [timer, setTimer] = useState();
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTime) => {
        if (prevTime > 0) {
          console.log(prevTime);
          return prevTime - 1;
        } else {
          clearInterval(countdown);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [timer]);

  const handleSubmit = () => {
    const currentTime = Date.now();
    const responseTime = Math.floor((currentTime - data.startTime) / 1000);
    socket.emit("submit-response", { userId: socket.id, time: responseTime });
  };

  return (
    <Container>
      <CardWrapper>
        {socket && socket.connected && data && data.startQuiz ? (
          <div className="elementsDiv">
            <div className="quizElements">
              <Pera>Candidate</Pera>
              {data.waitForMaster ? (
                <Pera>Waiting for the Master...</Pera>
              ) : (
                <div className="optionsDiv">
                  {data.startTimer ? (
                    <Header>
                      <TimerCircle>
                        <h2>{timer}</h2>
                      </TimerCircle>
                    </Header>
                  ) : (
                    ""
                  )}
                  <Question>Who is the first Prime Minister of India?</Question>
                  <div>
                    {data.startTimer ? (
                      <>
                        <div className="options">
                          {Object.entries(questions.options).map(
                            ([key, value]) => (
                              <Button
                              // key={key}
                              // onClick={() => setSelectedAnswer(key)}
                              >
                                <span>{`${key})`}</span>
                                {value}
                              </Button>
                            )
                          )}
                        </div>

                        <button className="submit-btn" onClick={handleSubmit}>
                          Submit
                        </button>
                      </>
                    ) : (
                      <div>Please wait for the timer to start...</div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="sideBar">
              <div className="lifeLine">
                <span>
                  <img src={fiftyFiftyImg} alt="Fifty Fifty Lifeline" />
                </span>
                <span>
                  <img src={audiencePoll} alt="Audience Poll Lifeline" />
                </span>
                <span>
                  <img
                    className="expertLifeLine"
                    src={expertLifeLine}
                    alt="Expert Lifeline"
                  />
                </span>
              </div>
              <ul>
                {moneyList.map((el) => (
                  <li key={el.id}>
                    <span className="indexOfPrice">{el.id}</span>
                    <span className="price">{el.amount}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <Pera>Loading...</Pera>
        )}
      </CardWrapper>
    </Container>
  );
};

export default Candidate;

// // ===================================================
// /* eslint-disable no-unused-vars */
// import React, { useState, useEffect } from "react";
// import { io } from "socket.io-client";
// // import useSound from "use-sound";
// import { useNavigate } from "react-router-dom";
// import fiftyFiftyImg from "../assets/fifty_fifty.png";
// import audiencePoll from "../assets/audience_poll.png";
// import expertLifeLine from "../assets/ask_the_expert.png";
// import {
//   Container,
//   CardWrapper,
//   Header,
//   TimerCircle,
//   Button,
//   Footer,
// } from "./Candidate.styles.js";
// const timerSound = new Audio("path-to-your-15s-sound.mp3");

// // import questionPlaySound from "../assets/play.mp3";

// const socket = io("http://localhost:3001");

// function App() {
//   const [timer, setTimer] = useState(30);
//   const [questions, setQuestions] = useState({});
//   const [Qid, setQId] = useState(1);
//   const [selectedAnswer, setSelectedAnswer] = useState(null);
//   const [winner, setWinner] = useState(null);
//   const navigate = useNavigate();

//   // const [play] = useSound(questionPlaySound, {
//   //   volume: 0.5,
//   //   interupt: true, // Adjust volume as needed
//   // });
//   // useEffect(() => {
//   //   const playSound = async () => {
//   //     try {
//   //       await play(); // Attempt to play sound
//   //     } catch (error) {
//   //       console.error("Autoplay blocked or other error:", error);
//   //     }
//   //   };

//   //   playSound();
//   // }, [play]);

//   const moneyList = [
//     { id: "1)", amount: "Rs. 500" },
//     { id: "2)", amount: "Rs. 1,000" },
//     { id: "3)", amount: "Rs. 2,000" },
//     { id: "4)", amount: "Rs. 4,000" },
//     { id: "5)", amount: "Rs. 7,000" },
//     { id: "6)", amount: "Rs. 15,000" },
//     { id: "7)", amount: "Rs. 21,000" },
//   ].reverse();

//   const handleSubmitAnswer = () => {
//     console.log(selectedAnswer + " selected ans");
//     if (selectedAnswer !== null) {
//       const responseTime = 30 - timer; // Calculate response time
//       socket.emit("answer", {
//         answer: selectedAnswer,
//         timeTaken: responseTime,
//       });
//       setSelectedAnswer(null); // Reset the selected answer
//     } else {
//       alert("Please select an answer before submitting!");
//     }
//   };

//   // Timer Countdown Logic
// useEffect(() => {
//   const countdown = setInterval(() => {
//     setTimer((prevTime) => {
//       if (prevTime > 0) {
//         return prevTime - 1;
//       } else {
//         clearInterval(countdown);
//         // Notify server that time is up
//         socket.emit("timeUp", { Qid, socketId: socket.id });
//         return 0;
//       }
//     });
//   }, 1000);

//     return () => clearInterval(countdown);
//   }, [Qid]);

//   // Handle server events for quiz result and winner declaration
//   useEffect(() => {
//     // socket.on("quizResult", (data) => {
//     //   console.log("Quiz result received:", data);

//     //   if (data.status === "correct" && data.socketId === socket.id) {
//     //     console.log("Correct answer submitted.");
//     //   } else if (data.status === "incorrect" && data.socketId === socket.id) {
//     //     console.log("Incorrect answer submitted. Redirecting to loser page...");
//     //     navigate("/loser"); // Redirect to loser page
//     //     socket.disconnect(); // Disconnect loser
//     //   }
//     // });

//     socket.on("winner", (userId) => {
//       console.log("Winner is:", userId);
//       setWinner(userId);

//       if (userId === socket.id) {
//         navigate("/winner"); // Redirect to winner page
//       } else {
//         navigate("/looser");
//         console.log("You are not the winner. Disconnecting...");
//         socket.disconnect(); // Disconnect all non-winners
//       }
//     });

//     return () => {
//       socket.off("quizResult");
//       socket.off("winner");
//     };
//   }, [navigate]);

//   // Fetch current question
//   useEffect(() => {
//     socket.emit("question", Qid);

//     const handleCurrentQuestion = (data) => {
//       console.log("Received question data:", data);
//       setQuestions(data || {});
//     };

//     socket.on("currentQuestion", handleCurrentQuestion);

//     return () => {
//       socket.off("currentQuestion", handleCurrentQuestion);
//     };
//   }, [Qid]);

//   return (
//     <Container>
//       <CardWrapper>
//         <div className="elementsDiv">
//           <div className="quizElements">
// <Header>
//   <TimerCircle>
//     <h2>{timer}</h2>
//   </TimerCircle>
// </Header>
//             <div className="optionsDiv">
//               <p>{questions.question || "Loading question..."}</p>
//               {questions.options ? (
//                 <div className="options">
//                   {Object.values(questions.options).map((el, index) => (
//                     <Button
//                       key={index}
//                       onClick={() => setSelectedAnswer(el)}
//                       className={selectedAnswer === el ? "selected" : ""}
//                     >
//                       {el}
//                     </Button>
//                   ))}
//                 </div>
//               ) : (
//                 <p>No options available</p>
//               )}
//             </div>

//             <div className="submitBtnDiv">
//               <button className="submit-btn" onClick={handleSubmitAnswer}>
//                 Lock
//               </button>
//             </div>
//           </div>

//           <div className="sideBar">
//             <div className="lifeLine">
//               <span>
//                 <img src={fiftyFiftyImg} alt="fifty_fifty.png" />
//               </span>
//               <span>
//                 <img src={audiencePoll} alt="audience-poll" />
//               </span>
//               <span>
//                 <img
//                   className="expertLifeLine"
//                   src={expertLifeLine}
//                   alt="expertLifeLine"
//                 />
//               </span>
//             </div>
//             {moneyList.map((el) => {
//               return (
//                 <>
//                   <li>
//                     <span className="indexOfPrice">{el.id}</span>
//                     <span className="price">{el.amount}</span>
//                   </li>
//                 </>
//               );
//             })}
//           </div>
//         </div>
//         <Footer>{winner && <p>Winner: {winner}</p>}</Footer>
//       </CardWrapper>
//     </Container>
//   );
// }

// export default App;
