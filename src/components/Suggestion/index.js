import React, { Fragment } from "react";

import { FmdGoodOutlined } from "@mui/icons-material";

import "./Suggestion.css";
import { useDispatch, useSelector } from "react-redux";
import { getPostsByLocation, postActions } from "../../core/slices/postSlice";
import { NavLink } from "react-router-dom";

// const suggest_locations = [
//   'Ranchi, Jharkhand',
//   'Shimla, Himachal Pradesh',
//   'Mathura, UP',
//   'New Delhi, UP'

// ]
export default function Suggestion({ locationOptions }) {
  const dispatch = useDispatch();
  const filteredPosts = useSelector((state) => state.post.filteredPosts);

  return (
    <Fragment>
      <div className="suggest-location__card">
        <div className="suggest-location__title">Recommended Locations</div>

        <ul className="suggest-location__items">
          {locationOptions.map((location, index) => (
            <NavLink style={{ color: "black" }} to={encodeURI(`/posts/location/${location}`)}>
              <li
                className="suggest-location__item"
                key={index}
                onClick={() => dispatch(getPostsByLocation(location))}
              >
                <FmdGoodOutlined
                  sx={{
                    fontSize: "2rem",
                    marginRight: "0.2rem",
                    color: "#ed4956",
                  }}
                />
                <p>{location}</p>
              </li>
            </NavLink>
          ))}
        </ul>
      </div>
    </Fragment>
  );
}
