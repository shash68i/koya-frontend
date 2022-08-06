import React, { Fragment, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";

import Signup from "./pages/Signup";
import "./App.css";
import Login from "./pages/Login";

import Home from "./pages/Home/Home";
import DetailPostCard from "./pages/DetailPostCard";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import CreatePost from "./pages/CreatePost";
import PrivateRoute from "./components/Route/PrivateRoute";
import { ToastContainer } from "react-toastify";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./core/slices/authSlice";
import CreateProfile from "./pages/CreateProfile";
import UserProfile from "./pages/UserProfile";

import "react-toastify/dist/ReactToastify.css";
import { getMyProfile } from "./core/slices/userSlice";
import { LocationPosts } from "./components";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // check for token in LS when app first runs
    if (localStorage.token) {
      // if there is a token set axios headers for all requests
      setAuthToken(localStorage.token);
    }
    // try to fetch a user, if no token or invalid token we
    // will get a 401 response from our API
    dispatch(loadUser());
    dispatch(getMyProfile());

    // log user out from all tabs if they log out in one tab
    // window.addEventListener("storage", () => {
    //   if (!localStorage.token) dispatch(authActions.logoutUser());
    // });
  }, []);

  return (
    <Fragment>
      <ToastContainer
        bodyClassName="toast-text"
        toastClassName="toast-container"
        position="top-right"
        autoClose={800}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Routes>
        {/* Public Routes */}
        <Route path="register" element={<Signup />} />
        <Route path="login" element={<Login />} />

        {/* Protected Routes */}
        <Route path="/" element={<PrivateRoute component={Home} />} />

        <Route path="profile" element={<PrivateRoute component={Profile} />} />

        <Route path="/create-profile" element={<CreateProfile />} />

        <Route
          path="edit-profile"
          element={<PrivateRoute component={EditProfile} />}
        />

        <Route
          path="create-post"
          element={<PrivateRoute component={CreatePost} />}
        />

        <Route
          path="posts/:id"
          element={<PrivateRoute component={DetailPostCard} />}
        />
        <Route
          path="users/:id"
          element={<PrivateRoute component={UserProfile} />}
        />
        <Route
          path="/posts/location/:location"
          element={<PrivateRoute component={LocationPosts} />}
        />
      </Routes>
    </Fragment>
  );
}

export default App;
