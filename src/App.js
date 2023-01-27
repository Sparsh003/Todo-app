import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./components/Dashboard";
import Create from "./components/Create";
import List from "./components/List";
import Navbar from "./components/Navbar";
import "./assets/Styles/App.css";



const App = () => {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/list" element={<List />} />
        <Route path="/create" element={<Create />} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
