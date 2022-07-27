import { CircularProgress } from "@mui/material";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import CreateProfile from "../../pages/CreateProfile";
import Navbar from "../Navigation";

const PrivateRoute = ({ component: Component }) => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);
  const postsLoading = useSelector((state) => state.post.loading);
  const profile = useSelector((state) => state.user.myProfile);

  if (loading) {
    return (
      <div className="circular-progress">
        <Navbar />
        <CircularProgress />
      </div>
    );
  }

  if (isAuth) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return (
      <Fragment>
        <Navbar />
        {profile ? (
          <Component />
        ) : postsLoading ? (
          <Component />
        ) : (
          <CreateProfile />
        )}
      </Fragment>
    );
  }

  return <Navigate to="/login" />;
};

export default PrivateRoute;
