import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import { updateMyProfile } from "../../../core/slices/userSlice";

const initialValues = {
  bio: "",
  profile_pic: "",
  address: "",
  twitter: "",
  facebook: "",
  instagram: "",
};

const profileSchema = Yup.object().shape({
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

const useStateUtils = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const profile = useSelector((state) => state.user.myProfile);

  const [createProfileData, setCreateProfileData] = useState(initialValues);

  const handleCreateProfile = (values, { setSubmitting }) => {
    dispatch(updateMyProfile(values));
    navigate("/");
  };

  return {
    user,
    profile,
    profileSchema,
    createProfileData,
    handleCreateProfile,
  };
};

export default useStateUtils;
