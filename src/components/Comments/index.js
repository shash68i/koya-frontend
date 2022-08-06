import React, { useState } from "react";

import { SendRounded, AccountCircleOutlined } from "@mui/icons-material";

import Comment from "../Comment";

import "./Comments.css";
import { addComment } from "../../core/slices/postSlice";
import { useDispatch } from "react-redux";

const Comments = ({ comments, postId, profile_pic }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const handleAddComment = (e) => {
    e.preventDefault();
    const commentData = { text };
    dispatch(addComment({ postId, commentData }));
    setText("");
  };

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="comments-card">
      <form className="post-comment-form" onSubmit={handleAddComment}>
        <span className="profile-pic form-pic">
          {profile_pic ? (
            <img src={profile_pic} alt="Profile Pic" />
          ) : (
            <AccountCircleOutlined
              sx={{ fontSize: "3rem", color: "#4d4d4d" }}
            />
          )}
        </span>
        <div className="post-textarea-form">
          <textarea
            className="post-comment-input"
            rows={3}
            onChange={handleInputChange}
            placeholder="Add a comment..."
            value={text}
            required
          />
          <span className="post-comment-btn">
            <button
              style={{
                border: "none",
                cursor: "pointer",
                backgroundColor: "transparent",
              }}
              type="submit"
            >
              <SendRounded
                sx={{ fontSize: "2.4rem", margin: "0.4rem", fontWeight: "400" }}
              />
            </button>
          </span>
        </div>
      </form>

      <div className="comments">
        <div className="comments__title">Comments</div>
        {comments?.map((comment) => (
          <Comment
            postId={postId}
            comment={comment}
            key={comment._id}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
