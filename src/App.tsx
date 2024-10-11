import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Meeting from "@hypercontext/routes/meeting/index";
import Duration from "@hypercontext/routes/duration/index";
import "@hypercontext/styles/app.scss";
import { Navigate } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Duration />,
  },
  {
    path: "/meeting",
    element: <Meeting />,
  },
  { path: "*", element: <Navigate to="/" /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
