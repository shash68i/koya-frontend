import React, { Fragment } from "react";

import { FmdGoodOutlined } from "@mui/icons-material";

import "./Suggestion.css";
import { useDispatch } from "react-redux";
import { getPostsByLocation } from "../../core/slices/postSlice";
import { Link } from "react-router-dom";

export default function Suggestion({ locationOptions }) {
  const dispatch = useDispatch();

  return (
    <Fragment>
      <div className="suggest-location__card">
        <div className="suggest-location__title">Recommended Locations</div>

        <ul className="suggest-location__items">
          {locationOptions.map((location, index) => (
            <Link
              key={index}
              style={{ color: "black" }}
              to={encodeURI(`/posts/location/${location}`)}
            >
              <li
                className="suggest-location__item"
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
            </Link>
          ))}
        </ul>
      </div>
    </Fragment>
  );
}
