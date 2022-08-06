import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import { addPost } from "../../../core/slices/postSlice";

const initialValues = {
  text: "",
  location: "",
  images: [],
  tags: [],
};

const postSchema = Yup.object().shape({
  text: Yup.string()
    .min(10, "Too Short!")
    .max(500, "Too Long!")
    .required("Required!"),
  images: Yup.array().required('Add atleast 1 image'),
  location: Yup.string()
    .min(2, "Too Short!")
    .max(150, "Too Long!")
    .required("Required!"),
  tags: Yup.array().required('Add atleast 1 image'),
});

const useStateUtils = ({ handleClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [postData, setPostData] = useState(initialValues);

  const handlePostSubmit = (values, actions) => {
    setPostData(values);
    dispatch(addPost(values));
    actions.setSubmitting(false);
    handleClose();
    navigate("/");
  };

  return { postData, postSchema, handlePostSubmit };
};

export default useStateUtils;
