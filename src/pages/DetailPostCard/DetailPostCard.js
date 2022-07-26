import React, { Fragment, useEffect } from "react";

import {
  AccountCircleTwoTone,
  FmdGoodOutlined,
  FavoriteOutlined,
  ModeCommentOutlined,
  FavoriteBorderOutlined,
  Close,
} from "@mui/icons-material";
import Carousel from "react-elastic-carousel";

import "../../components/PostCard/PostCard.css";
import { Comments, NearbyLocation } from "../../components";
import { NavLink } from "react-router-dom";

import useStateUtils from "./utils/useStateUtils";
import {
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";

function DetailPostCard() {
  const {
    isLiked,
    likesCount,
    isLikesDialogOpen,
    id,
    post,
    loading,
    loggedInUser,
    openLikesDialog,
    closeLikesDialog,
    getNearbyLocations,
    handleUpdateLikes,
  } = useStateUtils();

  return loading ? (
    <div className="circular-progress">
      <CircularProgress />
    </div>
  ) : (
    <Fragment>
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
            {post?.likes?.map((like) => (
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
      <div className="detail-post-card">
        <div className="post-card__title">
          <div className="profile-pic">
            {post?.profile_pic ? (
              <img src={post?.profile_pic} alt="Profile Pic" />
            ) : (
              <AccountCircleTwoTone
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
              {post?.location}
            </div>
            <div className="user-details">
              <NavLink
                to={`/users/${post?.user}`}
                state={{
                  first_name: post?.first_name,
                  last_name: post?.last_name,
                  username: post?.username,
                }}
              >
                <span className="name">
                  <strong>
                    {post?.first_name} {post?.last_name}
                  </strong>{" "}
                </span>
              </NavLink>
              <NavLink
                to={`/users/${post?.user}`}
                state={{
                  first_name: post?.first_name,
                  last_name: post?.last_name,
                  username: post?.username,
                }}
              >
                <span className="username">@{post?.username} </span>
              </NavLink>
              <span className="timestamp">
                &#8226;{Date(post?.date).slice(4, 15)}
              </span>
            </div>
          </div>
        </div>

        <div>
          <Carousel className="large-images-carousel" itemsToShow={1}>
            {post?.images?.map((image, index) => (
              <img src={image} key={index} alt="Post Images" />
            ))}
          </Carousel>
        </div>

        <div className="post-card__text">
          <strong>
            {post?.first_name} {post?.last_name}
          </strong>{" "}
          {post?.text}
          <div className="tags-wrapper">
            {post?.tags?.map((tag) => (
              <Typography variant="h6" color="#154078" noWrap>
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
                {likesCount === 0 || likesCount === 1
                  ? "like"
                  : "likes"}
              </IconButton>
            </span>

            <span>
              <ModeCommentOutlined
                sx={{ fontSize: "1.85rem", marginRight: "0.1rem" }}
              />
              {post?.comments.length}{" "}
              {post?.comments.length === 0 || post?.comments.length === 1
                ? "comment"
                : "comments"}
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
            <ModeCommentOutlined
              sx={{
                fontSize: "2.4rem",
                margin: "1rem",
                fontWeight: "400",
              }}
            />
          </span>
        </div>
      </div>

      <Comments
        comments={post?.comments}
        postId={id}
        user={post?.user}
        profile_pic={post?.profile_pic}
      />
      <div className="nearby-location-section">
        <NearbyLocation locationOptions={getNearbyLocations()} />
      </div>
    </Fragment>
  );
}

export default DetailPostCard;
