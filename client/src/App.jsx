import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CreateAccount from "./views/CreateAccount";
import Login from "./views/Login";
import Register from "./views/Register";
import { UserContext } from "./contexts/UserContext";
import Home from "./views/Home";

function App() {
  const [userData, setUserData] = useState({});
  const [tweets, setTweets] = useState([]);
  const [errorMessage, setErrorMessage] = useState({});
  const [succeedMessage, setSucceedMessage] = useState({});
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    console.log(userData);
  };

  return (
    <div className="App">
      <UserContext.Provider
        value={{
          userData,
          setUserData,
          handleChange,
          errorMessage,
          setErrorMessage,
          succeedMessage,
          setSucceedMessage,
          user,
          setUser,
          tweets,
          setTweets,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={user.token ? <Home /> : <Navigate to="/register" />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register/createAccount" element={<CreateAccount />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
