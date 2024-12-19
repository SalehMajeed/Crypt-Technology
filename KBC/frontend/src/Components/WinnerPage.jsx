import React from "react";

function WinnerPage({myResult}) {
 function handleWinnerFunc() {
    return <>
      <div>
      <h3>is NaN === number</h3>
      <input type="text"/>
      </div>
    </>
 } 
  return (
    <div>
      <h1>Congratulations!</h1>
      <h2>Round One is Cleared...</h2>
          <h3>Answer: {myResult.answer}</h3>
          <p>Response Time: {myResult.TimeTaken} ms</p>
          <button onClick={handleWinnerFunc}>Next Question</button>
    </div>
  );
}

export default WinnerPage;
