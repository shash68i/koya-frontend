import React, { Fragment } from "react";

import { FmdGoodOutlined } from "@mui/icons-material";

import "./NearbyLocation.css";
import { useDispatch, useSelector } from "react-redux";
import { postActions } from "../../core/slices/postSlice";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";

export default function NearbyLocation({ locationOptions }) {
  return (
    <Fragment>
      <div className="nearby-location__card">
        <div className="nearby-location__title">Nearby Locations</div>

        <div className="nearby-location__items">
          {locationOptions?.map((location, index) => (
            <NavLink
              style={{ color: "black" }}
              to={encodeURI(`/posts/location/${location}`)}
            >
              <span className="nearby-location__item" key={index}>
                <FmdGoodOutlined
                  sx={{
                    fontSize: "2rem",
                    marginRight: "0.2rem",
                    color: "#ed4956",
                  }}
                />
                <p>{location}</p>
              </span>
            </NavLink>
          ))}
        </div>
      </div>
    </Fragment>
  );
}
