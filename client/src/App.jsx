import React from "react";
import {
  DashboardLayout,
  Login,
  Register,
  AddJob,
  EditJob,
  Stats,
  AllJobs,
  Error,
  Profile,
  Admin,
  HomeLayout,
  Landing,
} from "./pages/index.js";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { action as registerAction } from "./pages/Register.jsx";
import { action as loginAction } from "./pages/Login.jsx";
import { action as addJobAction } from "./pages/AddJob.jsx";
import { loader as dashboardLoader } from "./pages/Dashboard.jsx";
import { loader as allJobLoader } from "./pages/AllJobs.jsx";
import { loader as editJobLoader } from "./pages/EditJob.jsx";
import { action as editJobAction } from "./pages/EditJob.jsx";
import { action as deleteJobAction } from "./pages/DeleteJob.jsx";
import { loader as adminLoader } from "./pages/Admin.jsx";
import { loader as statsLoader } from "./pages/Stats.jsx";
import { action as profileAction } from "./pages/Profile.jsx";

const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};

const isDarkThemeEnabled = checkDefaultTheme();

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      errorElement: <Error />,
      children: [
        { index: true, element: <Landing /> },
        {
          path: "register",
          element: <Register />,
          action: registerAction,
        },
        { path: "login", element: <Login />, action: loginAction },
        {
          path: "dashboard",
          element: <DashboardLayout isDarkThemeEnabled={isDarkThemeEnabled} />,
          loader: dashboardLoader,
          children: [
            { index: true, element: <AddJob />, action: addJobAction },
            { path: "admin", element: <Admin />, loader: adminLoader },
            { path: "stats", element: <Stats />, loader: statsLoader },
            { path: "all-jobs", element: <AllJobs />, loader: allJobLoader },
            { path: "profile", element: <Profile />, action: profileAction },
            {
              path: "edit-job/:id",
              element: <EditJob />,
              loader: editJobLoader,
              action: editJobAction,
            },
            { path: "delete-job/:id", action: deleteJobAction },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
