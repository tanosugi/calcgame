import React from "react";
import { Navigate } from "react-router-dom";
import NormalLayout from "./layouts/NormalLayout";
import AuthView from "./views/AuthView";
import CalcGameView from "./views/CalcGameView";
import ChooseGameView from "./views/ChooseGameView";
import MeetView from "./views/MeetView";
import NotFoundView from "./views/NotFoundView";

const routes = () => [
  {
    path: "/",
    element: <NormalLayout />,
    children: [
      { path: "/calcgame", element: <CalcGameView /> },
      { path: "/meet", element: <MeetView /> },
      { path: "/choose", element: <ChooseGameView /> },
      { path: "/", element: <Navigate to="/meet" /> },
      { path: "/404", element: <NotFoundView /> },
      { path: "/auth", element: <AuthView /> },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
];

export default routes;
