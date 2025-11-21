import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Login from "../Component/Login/Login";
import Register from "../Component/Register/Register";
import Home from "../Pages/Home/Home";
import DashboardLayout from "../Dashboard/DashboardLayout";
import { Component } from "react";
import UserManagement from "../Dashboard/UserManagement";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "/login", Component: Login },
      { path: "/register", Component: Register },
    ],
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [{ path: "userManagement", Component: UserManagement }],
  },
]);
