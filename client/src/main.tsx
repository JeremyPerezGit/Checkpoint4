import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App from "./App";
import Admin from "./pages/Admin";
import ConnectionPage from "./pages/ConnectionPage";
import Homepage from "./pages/Homepage";
import Scoreboard from "./pages/Scoreboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Homepage /> },
      { path: "login", element: <ConnectionPage /> },
      { path: "scoreboard", element: <Scoreboard /> },
      { path: "admin", element: <Admin /> },
    ],
  },
]);

const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
