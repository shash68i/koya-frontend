import React from "react";
import { NavLink } from "react-router-dom";

import "./Comment.css";

const Comment = ({ comment, userId }) => {
  const { username, first_name, last_name, profile_pic, text, date } = comment;
  const timestamp = new Date(date);

  return (
    <div className="comment-card-wrapper">
      <span className="comment__profile-pic">
        <img src={profile_pic} alt="Profile Pic" />
      </span>
      <div className="comment-card">
        <div className="comment__title">
          <NavLink
            to={`/users/${userId}`}
            state={{
              first_name: first_name,
              last_name: last_name,
              username: username,
            }}
          >
            <span className="comment__name">
              {first_name} {last_name}
            </span>
          </NavLink>
          <span className="comment__username">@{username} </span>
          <span className="comment__timestamp">
            &#8226;{" "}
            {timestamp.toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
              day: "numeric",
            })}{" "}
            {timestamp.toLocaleTimeString()}
          </span>
        </div>

        <div className="comment__text">{text}</div>
      </div>
    </div>
  );
};

export default Comment;
