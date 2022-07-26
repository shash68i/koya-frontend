import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { getMyProfile, updateMyProfile } from "../../../core/slices/userSlice";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

const editProfileSchema = Yup.object().shape({
  // email: Yup.string().email().required("Required!"),
  // location: Yup.string().required("Required!"),
  address: Yup.string().required("Required!"),
  bio: Yup.string(),
  profile_pic: Yup.string()
    // .matches(
    //   "/.(jpg|jpeg|png|webp|avif|gif|svg)$/",
    //   "Please enter a valid image Url"
    // )
    .required("Required!"),
  twitter: Yup.string(),
  facebook: Yup.string(),
  instagram: Yup.string(),
});

const stateUtils = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile = useSelector((state) => state.user.myProfile);
  const user = useSelector((state) => state.auth.user);


  const initialValues = {
    email: profile?.email || "",
    location: profile?.email || "",
    bio: profile?.bio || "",
    profile_pic: profile?.profile_pic || "",
    address: profile?.address || "",
    twitter: profile?.twitter || "",
    facebook: profile?.facebook || "",
    instagram: profile?.instagram || "",
  };

  const handleEditProfile = (values, { setSubmitting }) => {
    dispatch(updateMyProfile(values));
    navigate("/profile");
  };

  useEffect(() => {
    dispatch(getMyProfile());
  }, []);

  return {
    user,
    profile,
    initialValues,
    editProfileSchema,
    handleEditProfile,
  };
};

export default stateUtils;
