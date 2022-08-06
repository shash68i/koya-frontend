import React, { useState } from "react";

import {
  FmdGoodOutlined,
  AccountCircleOutlined,
  Close,
} from "@mui/icons-material";
import Carousel from "react-elastic-carousel";

import "./PostCard.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateLikes, updateMyLikes } from "../../core/slices/postSlice";
import { updateUserLikes } from "../../core/slices/userSlice";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { CommentIcon, DislikeIcon, LikeIcon } from "../../assets/icons";

function PostCard({ post, type }) {
  const {
    username,
    first_name,
    last_name,
    location,
    tags,
    text,
    images,
    profile_pic,
    likes,
    date,
    user,
    _id,
  } = post;

  const timestamp = new Date(date);

  const dispatch = useDispatch();

  const loggedInUser = useSelector((state) => state.auth.user);
  const [isLiked, setIsLiked] = useState(
    likes.some((like) => loggedInUser?._id === like.user)
  );
  const [likesCount, setLikesCount] = useState(likes.length);

  const [isLikesDialogOpen, setIsLikesDialog] = useState(false);

  const openLikesDialog = () => {
    setIsLikesDialog(true);
  };

  const closeLikesDialog = () => {
    setIsLikesDialog(false);
  };

  const handleUpdateLikes = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikesCount(likesCount - 1);
    } else {
      setIsLiked(true);
      setLikesCount(likesCount + 1);
    }
    if (type === "My Posts") {
      dispatch(updateMyLikes(_id));
    } else if (type === "User Posts") {
      dispatch(updateUserLikes(_id));
    } else {
      dispatch(updateLikes(_id));
    }
  };

  return (
    <>
      <Dialog
        className="likes-post-dialog"
        open={isLikesDialogOpen}
        onClose={closeLikesDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        title="Likes"
        fullWidth
      >
        <DialogTitle>
          <Typography sx={{ textAlign: "center" }} gutterBottom variant="h4">
            Likes
          </Typography>
          <Divider />
          <IconButton
            aria-label="close"
            onClick={closeLikesDialog}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close fontSize="30px" />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container alignItems="center" rowSpacing={1}>
            {likes.map((like, index) => (
              <Grid
                key={index}
                item
                sm={12}
                sx={{ display: "flex", gap: "1rem", alignItems: "center" }}
              >
                <Box
                  component="img"
                  className="likes-profile-pic"
                  src={like.profile_pic}
                />

                <Link
                  className="profile-link"
                  to={`/users/${like.user}`}
                  state={{
                    first_name: like.first_name,
                    last_name: like.last_name,
                    username: like.username,
                  }}
                >
                  <Typography
                    variant="h6"
                    color="black"
                    fontWeight={600}
                    noWrap
                  >
                    {like.first_name} {like.last_name}
                  </Typography>
                  <Typography variant="h6" color="gray" fontWeight={600}>
                    @{like.username}
                  </Typography>
                </Link>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
      </Dialog>
      <div className="post-card">
        <div className="post-card__title">
          <div className="profile-pic">
            {profile_pic ? (
              <img src={profile_pic} alt="Profile Pic" />
            ) : (
              <AccountCircleOutlined
                sx={{ fontSize: "4.5rem", color: "#4d4d4d" }}
              />
            )}
          </div>

          <div className="user-info__group">
            <div className="user-location">
              <FmdGoodOutlined
                sx={{
                  fontSize: "1.7rem",
                  marginRight: "0.2rem",
                  color: "#ea4335",
                }}
              />{" "}
              {location}
            </div>
            <div className="user-details">
              <Link
                to={`/users/${user}`}
                state={{ first_name, last_name, username }}
              >
                <span className="name">
                  <strong>
                    {first_name} {last_name}
                  </strong>{" "}
                </span>
              </Link>
              <span className="username">@{username} </span>
              <span className="timestamp">{timestamp.toDateString()}</span>
            </div>
          </div>
        </div>

        <div>
          <Carousel className="images-carousel" itemsToShow={1}>
            {images.map((image, index) => (
              <Link to={`/posts/${_id}`} key={`image-${index + 1}`}>
                <img src={image} alt="Post Images" />
              </Link>
            ))}
          </Carousel>
        </div>

        <div className="post-card__text">
          <Box sx={{ fontSize: "16px" }}>
            <strong>
              {post?.first_name} {post?.last_name}
            </strong>{" "}
            {text}
          </Box>
          <div className="tags-wrapper">
            {tags?.map((tag, index) => (
              <Typography key={index} fontSize="16px" color="#154078" noWrap>
                #{tag}
              </Typography>
            ))}
          </div>
          <div className="post-card__actions-info">
            <span>
              <IconButton
                ddisabled={likesCount === 0}
                onClick={openLikesDialog}
              >
                <Box
                  component="img"
                  src={LikeIcon}
                  sx={{
                    height: "2rem",
                    width: "2rem",
                    cursor: "pointer",
                    marginRight: "0.8rem",
                  }}
                />
                {likesCount}{" "}
                {likesCount === 0 || likesCount === 1 ? "like" : "likes"}
              </IconButton>
            </span>

            <span>
              <Link className="comment" to={`/posts/${_id}`}>
                <Box
                  component="img"
                  src={CommentIcon}
                  sx={{
                    height: "2rem",
                    width: "2rem",
                    cursor: "pointer",
                    marginRight: "0.8rem",
                  }}
                />
                {post.comments.length}{" "}
                {post.comments.length === 0 || post.comments.length === 1
                  ? "comment"
                  : "comments"}
              </Link>
            </span>
          </div>
        </div>

        <div className="post-card__actions">
          <span className="action-items">
            {isLiked ? (
              <Box
                component="img"
                onClick={handleUpdateLikes}
                src={LikeIcon}
                sx={{
                  height: "1.8rem",
                  width: "1.8rem",
                  margin: "1rem",
                  cursor: "pointer",
                }}
              />
            ) : (
              <Box
                component="img"
                onClick={handleUpdateLikes}
                src={DislikeIcon}
                sx={{
                  height: "2rem",
                  width: "2rem",
                  cursor: "pointer",
                  margin: "1rem",
                }}
              />
            )}
          </span>
          <span className="action-items">
            <Link to={`/posts/${_id}`}>
              <Box
                component="img"
                src={CommentIcon}
                sx={{
                  height: "2rem",
                  width: "2rem",
                  cursor: "pointer",
                  margin: "1rem",
                }}
              />
            </Link>
          </span>
        </div>
      </div>
    </>
  );
}

export default PostCard;
