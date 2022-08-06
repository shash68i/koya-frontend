import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";

import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

import { Box, CircularProgress } from "@mui/material";
import FormImage from "../../assets/images/form_image.jpg";
import { loadUser, loginUser } from "../../core/slices/authSlice";
import { getMyProfile } from "../../core/slices/userSlice";
import "./LoginSignup.css";

const loginData = {
  email: "",
  password: "",
};

const loginSchema = Yup.object({
  email: Yup.string()
    .email("Must be a valid mail")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is Required!"),
});

function Login() {
  const dispatch = useDispatch(); // For dispatching the actions
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);

  const handleLogin = (values, { setSubmitting }) => {
    setSubmitting(false);
    dispatch(loginUser(JSON.stringify(values)));
  };

  useEffect(() => {
    if (isAuth) {
      dispatch(loadUser());
      dispatch(getMyProfile());
    }
  }, [isAuth]);

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className="page-wrapper">
      <div className="auth-container">
        <div className="auth-image-section">
          <img src={FormImage} alt="Login Form" />
        </div>
        <div className="form-section">
          <Formik
            initialValues={loginData}
            validationSchema={loginSchema}
            enableReinitialize={true}
            validateOnBlur={false}
            onSubmit={handleLogin}
          >
            <Form className="form-fields">
              <div className="form-heading">Log In</div>
              <div className="form-field">
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                />
                <ErrorMessage className="error" component="div" name="email" />
              </div>
              <div className="form-field">
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                />
                <ErrorMessage
                  className="error"
                  component="div"
                  name="password"
                />
              </div>

              <button type="submit" className="auth-button">
                {loading ? (
                  <Box display="flex" alignItems="center">
                    <CircularProgress size="2.5rem" sx={{ color: "#d3d3d3" }} />
                  </Box>
                ) : (
                  "Log In"
                )}
              </button>
              <div className="auth-footer">
                Don't have an account?{" "}
                <span>
                  {" "}
                  <Link to="/register">Register</Link>
                </span>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Login;
