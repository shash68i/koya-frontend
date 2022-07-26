import React, { useEffect } from "react";
import { NavLink, Link, Navigate } from "react-router-dom";
import {
  AccountCircleTwoTone,
  EmailOutlined,
  FacebookOutlined,
  FmdGoodOutlined,
  Instagram,
  Twitter,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";

import "./Profile.css";

import { getMyPosts } from "../../core/slices/postSlice";

import { PostCard } from "../../components";
import { CircularProgress, IconButton } from "@mui/material";

export default function Profile() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const profile = useSelector((state) => state.user.myProfile);
  const posts = useSelector((state) => state.post.myPosts);
  const loading = useSelector((state) => state.post.loading);

  console.log(loading, "loading");

  useEffect(() => {
    dispatch(getMyPosts(user));
  }, []);

  if (profile === null) {
    return <Navigate to="/create-profile" />;
  }

  if (loading) {
    return (
      <div className="circular-progress">
        <CircularProgress />
      </div>
    );
  }

  return (
    profile && (
      <div className="profile-page">
        <div className="profile-card">
          <div className="profile-card-left">
            <span className="profile-large-pic">
              {profile.profile_pic ? (
                <img src={profile?.profile_pic} alt="Profile Pic" />
              ) : (
                <AccountCircleTwoTone
                  sx={{ fontSize: "4.5rem", color: "#4d4d4d" }}
                />
              )}
            </span>
          </div>

          <div className="profile-card-right">
            <span className="profile__name">
              {user.first_name} {user.last_name}
            </span>
            <span className="profile__username">@{user.username} </span>
            <span className="profile__socials">
              {profile.twitter && (
                <a target="_blank" rel="noreferrer" href={profile.twitter}>
                  <IconButton style={{ padding: "0rem" }}>
                    <Twitter
                      className="twitter"
                      sx={{ fontSize: "2rem", color: "#00acee" }}
                    />
                  </IconButton>
                </a>
              )}
              {profile.facebook && (
                <a target="_blank" rel="noreferrer" href={profile.facebook}>
                  <IconButton style={{ padding: "0rem" }}>
                    <FacebookOutlined
                      className="facebook"
                      sx={{ fontSize: "2rem", color: "#3b5998" }}
                    />
                  </IconButton>
                </a>
              )}
              {profile.twitter && (
                <a target="_blank" rel="noreferrer" href={profile.instagram}>
                  <IconButton style={{ padding: "0rem" }}>
                    <Instagram
                      className="instagram"
                      sx={{ fontSize: "2rem", color: "#E1306C" }}
                    />
                  </IconButton>
                </a>
              )}
            </span>

            <span className="profile__bio">
              <br />
              {profile.bio}
            </span>

            <NavLink to="/edit-profile" className="profile-edit">
              <button className="edit-profile-btn">Edit Profile</button>
            </NavLink>
          </div>
        </div>

        {posts?.map((post) => (
          <PostCard post={post} key={post._id} type="My Posts" />
        ))}
      </div>
    )
  );
}
