import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./Routes/index";
import { SocketProvider } from "./contexts/SocketContext";

const App = () => {
  return (
    <SocketProvider>
      <Router>
        <AppRoutes />
      </Router>
    </SocketProvider>
  );
};

export default App;