import { useRoutes } from "react-router-dom";
import { ROUTES } from "../Constants/routes";
import Master from "../Components/Master/Master";
import Candidate from "../Components/Candidate/Candidate";
import Live from "../Components/Live/Live";

const AppRoutes = () => {
  return useRoutes([
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
  ]);
};

export default AppRoutes;
