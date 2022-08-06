import React from "react";
import { Link } from "react-router-dom";

import { Formik, Form, Field, ErrorMessage } from "formik";

import "./EditProfile.css";
import useStateUtils from "./utils/useStateUtils";
import { AccountCircleSharp } from "@mui/icons-material";

export default function EditProfile() {
  const { initialValues, user, profile, editProfileSchema, handleEditProfile } =
    useStateUtils();

  return (
    user &&
    profile && (
      <div className="edit-profile-container">
        <div className="edit-profile-card">
          {profile?.profile_pic ? (
            <div className="edit-profile__pic">
              <img src={profile?.profile_pic} alt="Profile Pic" />
            </div>
          ) : (
            <AccountCircleSharp sx={{ fontSize: "15rem", color: "#4d4d4d" }} />
          )}

          <span className="profile__name">
            {user.first_name} {user.lastName}
          </span>
          <span className="profile__username">@{user.username} </span>

          <div className="edit-profile-section">
            <Formik
              initialValues={initialValues}
              validationSchema={editProfileSchema}
              enableReinitialize={true}
              validateOnBlur={false}
              onSubmit={handleEditProfile}
            >
              <Form className="edit-form-fields">
                <div className="edit-form-heading">Edit Profile</div>

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
                    autocomplete="off"
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
                  <Link to="/profile">
                    <button className="action-button cancel">Cancel</button>
                  </Link>
                  <button type="submit" className="action-button save">
                    Save
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    )
  );
}
