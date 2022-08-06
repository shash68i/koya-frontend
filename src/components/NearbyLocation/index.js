import React, { Fragment } from "react";
import { FmdGoodOutlined } from "@mui/icons-material";
import "./NearbyLocation.css";
import { Link } from "react-router-dom";

export default function NearbyLocation({ locationOptions }) {
  return (
    <Fragment>
      <div className="nearby-location__card">
        <div className="nearby-location__title">Nearby Locations</div>

        <div className="nearby-location__items">
          {locationOptions?.map((location, index) => (
            <Link
              key={index}
              style={{ color: "black" }}
              to={encodeURI(`/posts/location/${location}`)}
            >
              <span className="nearby-location__item">
                <FmdGoodOutlined
                  sx={{
                    fontSize: "2rem",
                    marginRight: "0.2rem",
                    color: "#ed4956",
                  }}
                />
                <p>{location}</p>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </Fragment>
  );
}
