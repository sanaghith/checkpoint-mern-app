import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NavBar from "./components/NavBar";
import Profile from "./pages/Profile";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import PrivateRoutes from "./Routes/PrivateRoutes";
import Feed from "./pages/Feed";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/feed" element={<Feed />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
