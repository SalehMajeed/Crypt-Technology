import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  return (
    <div className="container-fluid bg-dark d-flex justify-content-center align-items-center vh-100 vw-100">
      {/* Card Wrapper */}
      <div
        className="card p-4 rounded shadow-lg text-white"
        style={{ backgroundColor: '#2e004a', width: '800px', maxWidth: '90%' }}
      >
        {/* Header Section */}
        <div className="text-center mb-3">
          <p className="small mb-2">Fastest Fingers First Question</p>
          <h6>PLAYING FOR</h6>
          <div className="timer-circle d-inline-block">
            <h2 className="text-success">{timer}</h2>
          </div>
        </div>

        {/* Question Section */}
        <div className="mb-4">
          <p className="text-center mb-3">
            Arrange these mountain peaks according to their height, from the tallest to the shortest
          </p>
          <div className="d-flex flex-column">
            <button className="btn btn-outline-light mb-2 text-start">A. Everest</button>
            <button className="btn btn-outline-light mb-2 text-start">B. Kalsubai</button>
            <button className="btn btn-outline-light mb-2 text-start">C. Nanda Devi</button>
            <button className="btn btn-outline-light mb-2 text-start">D. Kangchenjunga</button>
          </div>
        </div>

        {/* Reset and Lock Section */}
        <div className="d-flex justify-content-between">
          <button className="btn btn-sm btn-secondary">RESET</button>
          <button className="btn btn-success">LOCK →</button>
        </div>
      </div>
    </div>
  );
}

export default App;