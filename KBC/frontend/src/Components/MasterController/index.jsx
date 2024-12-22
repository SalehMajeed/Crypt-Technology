import React, { useState } from "react";

const MasterController = () => {
    const [status, setStatus] = useState("");

    const distributeQuestion = async () => {
        try {
            const response = await fetch("http://localhost:3000/master/distribute", {
                method: "POST",
            });
            const data = await response.json();
            setStatus(data.message);
        } catch (error) {
            setStatus("Error distributing question.");
        }
    };

    const resetSession = async () => {
        try {
            const response = await fetch("http://localhost:3000/master/reset", {
                method: "POST",
            });
            const data = await response.json();
            setStatus(data.message);
        } catch (error) {
            setStatus("Error resetting session.");
        }
    };

    return (
        <div>
            <h1>Master Controller</h1>
            <button onClick={distributeQuestion}>Start / Distribute Question</button>
            <button onClick={resetSession}>Reset</button>
            {status && <p>{status}</p>}
        </div>
    );
};

export default MasterController;
