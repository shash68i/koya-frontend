import React from "react";

import { Link, Navigate } from "react-router-dom";

import { ErrorMessage, Field, Form, Formik } from "formik";
import { AccountCircleSharp } from "@mui/icons-material";
import "./CreateProfile.css";
import useStateUtils from "./utils/useStateUtils";


export default function CreateProfile() {
  const {
    user,
    profile,
    profileSchema,
    createProfileData,
    handleCreateProfile,
  } = useStateUtils();

  if (profile !== null) {
    return <Navigate to="/profile" />;
  }

  return user === null ? null : (
    <div className="create-profile-container">
      <div className="edit-profile-card">
        <AccountCircleSharp sx={{ fontSize: "15rem", color: "#4d4d4d" }} />

        <span className="profile__name">
          {user.first_name} {user.last_name}
        </span>
        <span className="profile__username">{user.username} </span>

        <div className="edit-profile-section">
          <Formik
            initialValues={createProfileData}
            validationSchema={profileSchema}
            enableReinitialize={true}
            validateOnBlur={false}
            onSubmit={handleCreateProfile}
          >
            <Form className="edit-form-fields">
              <div className="edit-form-heading">Create Profile</div>

              <div className="edit-group">
                <Field
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Address"
                  autocomplete="off"
                />
                <ErrorMessage
                  className="error"
                  component="div"
                  name="address"
                />
              </div>

              <div className="edit-group">
                <Field
                  type="text"
                  id="bio"
                  name="bio"
                  placeholder="Bio"
                  autocomplete="off"
                />
              </div>

              <div className="edit-group">
                <Field
                  type="text"
                  id="profile_pic"
                  name="profile_pic"
                  placeholder="Profile Pic URL"
                  autocomplete="off"
                />
                <ErrorMessage
                  className="error"
                  component="div"
                  name="profile_pic"
                />
              </div>

              <div className="edit-group">
                <Field
                  type="text"
                  id="facebook"
                  name="facebook"
                  placeholder="Facebook Profile URL"
                  autocomplete="off"
                />
              </div>

              <div className="edit-group">
                <Field
                  type="text"
                  id="twitter"
                  name="twitter"
                  placeholder="Twitter Profile URL"
                  autocomplete="off"
                />
              </div>

              <div className="edit-group">
                <Field
                  type="text"
                  id="instagram"
                  name="instagram"
                  placeholder="Instagram Profile URL"
                  autocomplete="off"
                />
              </div>

              <div className="edit-group-btn">
                <Link to="/profile"></Link>
                <button type="submit" className="action-button save">
                  Save
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}
