import React, { useEffect, useState } from "react";

import {
  FmdGoodOutlined,
  FavoriteOutlined,
  ModeCommentOutlined,
  FavoriteBorderOutlined,
  AccountCircleOutlined,
  Close,
} from "@mui/icons-material";
// import  from "@mui/icons-material/LocationOnTwoTone";
// import  from '@mui/icons-material/NavigateNextOutlined';
import Carousel from "react-elastic-carousel";

import "./PostCard.css";
import { NavLink, Link } from "react-router-dom";
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
  Paper,
  Typography,
} from "@mui/material";

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
        className="create-post-dialog"
        open={isLikesDialogOpen}
        onClose={closeLikesDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        title="Likes"
        maxWidth="md"
      >
        <DialogTitle sx={{ width: { sm: "30rem", md: "40rem" } }}>
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
          <Grid container alignItems="center" rowSpacing={2}>
            {likes.map((like) => (
              <>
                <Grid item sm={2}>
                  <Box
                    component="img"
                    className="profile-pic"
                    src={like.profile_pic}
                  />
                </Grid>
                <Grid item sm={10}>
                  <Typography variant="h6" color="black" fontWeight={600}>
                    {like.first_name} {like.last_name}
                  </Typography>
                </Grid>
              </>
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
              <NavLink to={`/posts/${_id}`} key={`image-${index + 1}`}>
                <img src={image} alt="Post Images" />
              </NavLink>
            ))}
          </Carousel>
        </div>

        <div className="post-card__text">
          <Box sx={{ fontSize: "16px"}}>
            <strong>
              {post?.first_name} {post?.last_name}
            </strong>{" "}
            {text}
          </Box>
          <div className="tags-wrapper">
            {tags?.map((tag) => (
              <Typography fontSize="16px" color="#154078" noWrap>
                #{tag}
              </Typography>
            ))}
          </div>
          <div className="post-card__actions-info">
            <span>
              <IconButton onClick={openLikesDialog}>
                <FavoriteOutlined
                  sx={{
                    fontSize: "1.85rem",
                    marginRight: "0.1rem",
                    color: "#ed4956",
                  }}
                />
                {likesCount}{" "}
                {likesCount === 0 || likesCount === 1 ? "like" : "likes"}
              </IconButton>
            </span>

            <span>
              <NavLink className="comment" to={`/posts/${_id}`}>
                <ModeCommentOutlined
                  sx={{ fontSize: "1.85rem", marginRight: "0.3rem" }}
                />
                {post.comments.length}{" "}
                {post.comments.length === 0 || post.comments.length === 1
                  ? "comment"
                  : "comments"}
              </NavLink>
            </span>
          </div>
        </div>

        <div className="post-card__actions">
          <span className="action-items">
            {isLiked ? (
              <FavoriteOutlined
                onClick={handleUpdateLikes}
                sx={{
                  width: "2em",
                  cursor: "pointer",
                  fontSize: "2.7rem",
                  margin: "1rem",
                  padding: "0 1rem",
                  color: "#ed4956",
                }}
              />
            ) : (
              <FavoriteBorderOutlined
                onClick={handleUpdateLikes}
                sx={{
                  width: "2em",
                  cursor: "pointer",
                  fontSize: "2.7rem",
                  margin: "1rem",
                  padding: "0 1rem",
                }}
              />
            )}
          </span>
          <span className="action-items">
            <NavLink to={`/posts/${_id}`}>
              <ModeCommentOutlined
                sx={{
                  width: "2em",
                  cursor: "pointer",
                  fontSize: "2.4rem",
                  margin: "1rem",
                  padding: "0 1rem",
                  fontWeight: "400",
                }}
              />
            </NavLink>
          </span>
        </div>
      </div>
    </>
  );
}

export default PostCard;
