import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import axios from "axios";
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
import AddMember from "../components/AddMember";
import Dashboard from "../components/Dashboard";
import Layout from "../components/Layout/Layout";
import Messenger from "../components/Messenger";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import PlayGround from '../pages/PlayGround';
import store from "../store";
import PrivateRoute from "./PrivateRoute";


const token = localStorage.getItem('token');
const isProduction = import.meta.env.PROD;

axios.defaults.baseURL = isProduction ? import.meta.env.VITE_PRODUCTION_URL : import.meta.env.VITE_DEVELOPMENT_URL;
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
        <Route index element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/new" element={<PrivateRoute><AddMember /></PrivateRoute>} />
        <Route path="/messenger" element={<PrivateRoute><Messenger /></PrivateRoute>} />
      </Route>
      
      <Route path="/play" element={<PlayGround />} />
      <Route path="/login" element={<Login />}/>
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
