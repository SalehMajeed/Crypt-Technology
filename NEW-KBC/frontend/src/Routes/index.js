import { useRoutes } from "react-router-dom";
import { ROUTES } from "../Constants/routes";
import Master from "../Components/Master/Master";
import Candidate from "../Components/Candidate/Candidate";
import Live from "../Components/Live/Live";
import Home from "../Components/Home/Home";
import Winner from "../Components/WinnerPage.jsx";  // Import Winner component
import Loser from "../Components/LooserPage.jsx";    // Import Loser component

const AppRoutes = () => {
  return useRoutes([
    {
      path: ROUTES.HOME,
      exact: true,
      element: <Home />,
    },
    {
      path: ROUTES.MASTER,
      exact: true,
      element: <Master />,
    },
    {
      path: ROUTES.CANDIDATE,
      exact: true,
      element: <Candidate />,
    },
    {
      path: ROUTES.LIVE,
      exact: true,
      element: <Live />,
    },
    {
      path: ROUTES.WINNER,   // Winner page route
      exact: true,
      element: <Winner />,   // Render Winner component
    },
    {
      path: ROUTES.LOSER,    // Loser page route
      exact: true,
      element: <Loser />,    // Render Loser component
    },
  ]);
};

export default AppRoutes;
