import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import PublicRoute from "../components/PublicRoute";
import Protected from "../components/Protected";
import { axiosInstance } from "../config/axiosInstance";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../features/authSlice";

const AppRoutes = () => {
  let dispatch = useDispatch();
  let getMeFromServer = async () => {
    try {
      let res = await axiosInstance.get("/auth/me");
      dispatch(addUser(res.data.user));
      console.log(res);
    } catch (error) {
      console.error(error)
      dispatch(removeUser());
    }
  };

  useEffect(() => {
    getMeFromServer();
  }, []);

  let router = createBrowserRouter([
    {
      path: "/",
      element: <PublicRoute />,
      children: [
        {
          path: "",
          element: <AuthLayout />,
          children: [
            {
              path: "",
              element: <Login />,
            },
            {
              path: "register",
              element: <Register />,
            },
          ],
        },
      ],
    },

    {
      path: "/home",
      element: <Protected />,
      children: [
        {
          path: "",
          element: <MainLayout />,
          children: [
            {
              path: "",
              element: <Home />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;