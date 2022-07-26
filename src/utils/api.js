import axios from "axios";
import { useDispatch } from "react-redux";

const API_URL = "https://glacial-reaches-43994.herokuapp.com/api";
// const API_URL = "http://localhost:5000/api";


export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "application/json",
    // Accept: "application/json",
    // "Access-Control-Allow-Origin": "http://localhost:3000",
    // 'Access-Control-Allow-Credentials': 'true'
    // Authorization: "Bearer " + token,
  },
});

/*
  NOTE: intercept any error responses from the api
 and check if the token is no longer valid.
 ie. Token has expired or user is no longer
 authenticated.
 logout the user if the token has expired
*/

// api.interceptors.response.use(
//   (res) => res,
//   (err) => {
//     if (err.response.status === 401) {
//       const dispatch = useDispatch();
//       dispatch(authActions.logoutUser());
//     }
//     return Promise.reject(err);
//   }
// );

export default api;
