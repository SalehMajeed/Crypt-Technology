import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import MasterController from "./Components/MasterController";
import LiveQuestion from "./Components/LiveQuestion";
import Candidate from "./Components/Candidate";

const App = () => {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/master">Master Controller</Link>
                        </li>
                        <li>
                            <Link to="/live">Live Question</Link>
                        </li>
                        <li>
                            <Link to="/candidate">Candidate</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/master" element={<MasterController />} />
                    <Route path="/live" element={<LiveQuestion />} />
                    <Route path="/candidate" element={<Candidate />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
