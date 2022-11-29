import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import React from "react";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import '../App.css';
import Dashboard from "../components/Dashboard";
import Invite from "../components/Invite";
import InvitesUser from "../components/InvitesUser";
import Layout from "../components/Layout/Layout";
import MessengerLayout from "../components/Layout/MessengerLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Messenger from "../pages/Messenger";
import NotFound from "../pages/NotFound";
import PlayGround from '../pages/PlayGround';
import Register from "../pages/Register";
import store from "../store";
import PrivateRoute from "./PrivateRoute";
import Root from "./Root";







const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Root />}
    >
      <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
        <Route index element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="new" element={<PrivateRoute><Invite /></PrivateRoute>} />
        <Route path="invites" element={<PrivateRoute><InvitesUser /></PrivateRoute>} />
      </Route>

      <Route path="messenger" element={<PrivateRoute><MessengerLayout /></PrivateRoute>}>
        <Route index element={<PrivateRoute><Messenger /></PrivateRoute>} />
      </Route>
      
      <Route path="play" element={<PlayGround />} />
      <Route path="login" element={<Login />}/>
      <Route path="register" element={<Register />}/>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

const App = () => {
  return (
    <Provider store={store}>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
