import React, { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { useParams } from "react-router";

import {
  AccountCircleTwoTone,
  EmailOutlined,
  FacebookOutlined,
  FmdGoodOutlined,
  Instagram,
  Twitter,
} from "@mui/icons-material";

import "../Profile/Profile.css";

import { useDispatch, useSelector } from "react-redux";
import { getUserPosts, getUserProfile } from "../../core/slices/userSlice";

import PostCard from "../../components/PostCard";
import { CircularProgress, IconButton } from "@mui/material";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { state } = useLocation();
  const { first_name, last_name, username } = state;

  const profile = useSelector((state) => state.user.userProfile);
  const posts = useSelector((state) => state.user.userPosts);
  const loggedInUser = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.user.loading);

  const isMyProfile = loggedInUser?._id === profile?.user;

  useEffect(() => {
    dispatch(getUserProfile(id));
    dispatch(getUserPosts(id));
  }, []);

  if (loading) {
    return (
      <div className="circular-progress">
        <CircularProgress />
      </div>
    );
  }

  return (
    profile &&
    posts && (
      <div className="profile-page">
        <div className="profile-card">
          <div className="profile-card-left">
            <span className="profile-large-pic">
              {profile.profile_pic ? (
                <img src={profile.profile_pic} alt="Profile Pic" />
              ) : (
                <AccountCircleTwoTone
                  sx={{ fontSize: "4.5rem", color: "#4d4d4d" }}
                />
              )}
            </span>
          </div>

          <div className="profile-card-right">
            <span className="profile__name">
              {first_name} {last_name}
            </span>
            <span className="profile__username">@{username} </span>
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

            {isMyProfile && (
              <NavLink to="/edit-profile" className="profile-edit">
                <button className="edit-profile-btn">Edit Profile</button>
              </NavLink>
            )}
          </div>

          {/* <div className="comment__text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. In metus
          vulputate eu scelerisque. <br />
          Amet commodo nulla facilisi nullam vehicula ipsum a arcu cursus. Neque
          ornare aenean euismod elementum nisi. Sollicitudin tempor id eu nisl
          nunc mi. Nibh mauris cursus mattis molestie a.
        </div> */}
        </div>

        {posts.length > 0 &&
          posts.map((post) => (
            <PostCard post={post} key={post._id} type="User Posts" />
          ))}
      </div>
    )
  );
};

export default UserProfile;
