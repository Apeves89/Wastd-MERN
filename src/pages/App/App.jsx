import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import { useState } from "react";

import LoginPage from "../LoginPage/LoginPage";
import SignupPage from "../SignupPage/SignupPage";
// import FeedPage from "../FeedPage/FeedPage";
// import ProfilePage from "../ProfilePage/ProfilePage";

import userService from "../../utilities/users-service";

export default function App() {
  const [user, setUser] = useState(userService.getUser());

  function handleSignUpOrLogin() {
    setUser(userService.getUser());
  }

  function handleLogout() {
    userService.logout();
    setUser(null);
  }

  if (user) {
    return (
      <Routes>
        {/* <Route
          path="/"
          element={<FeedPage loggedUser={user} handleLogout={handleLogout} />}
        /> */}
        <Route
          path="/login"
          element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
        />
        <Route
          path="/signup"
          element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin} />}
        />
        {/* <Route
          path="/:username"
          element={
            <ProfilePage loggedUser={loggedUser} handleLogout={handleLogout} />
          }
        /> */}
      </Routes>
    );
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
      />
      <Route
        path="/signup"
        element={(handleSignUpOrLogin = { handleSignUpOrLogin })}
      />
      <Route path="/*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
