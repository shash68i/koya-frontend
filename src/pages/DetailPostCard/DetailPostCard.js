import React, { Fragment } from "react";

import {
  AccountCircleTwoTone,
  FmdGoodOutlined,
  Close,
} from "@mui/icons-material";
import Carousel from "react-elastic-carousel";

import "../../components/PostCard/PostCard.css";
import { Comments, NearbyLocation } from "../../components";
import { Link } from "react-router-dom";

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
import { CommentIcon, DislikeIcon, LikeIcon } from "../../assets/icons";

function DetailPostCard() {
  const {
    isLiked,
    likesCount,
    isLikesDialogOpen,
    id,
    post,
    loading,
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
        className="likes-post-dialog"
        open={isLikesDialogOpen}
        onClose={closeLikesDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        title="Likes"
        maxWidth="md"
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
          <Grid container alignItems="center" rowSpacing={2}>
            {post?.likes?.map((like, index) => (
              <Grid
                item
                sm={12}
                key={`post-${index}`}
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
              <Link
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
              </Link>
              <Link
                to={`/users/${post?.user}`}
                state={{
                  first_name: post?.first_name,
                  last_name: post?.last_name,
                  username: post?.username,
                }}
              >
                <span className="username">@{post?.username} </span>
              </Link>
              <span className="timestamp">
                &#8226;{Date(post?.date).slice(4, 15)}
              </span>
            </div>
          </div>
        </div>

        <div>
          {post && (
            <Carousel className="large-images-carousel" itemsToShow={1}>
              {post?.images?.map((image, index) => (
                <img src={image} key={`post-img-${index}`} alt="Post Images" />
              ))}
            </Carousel>
          )}
        </div>

        <div className="post-card__text">
          <strong>
            {post?.first_name} {post?.last_name}
          </strong>{" "}
          {post?.text}
          <div className="tags-wrapper">
            {post?.tags?.map((tag, index) => (
              <Typography
                variant="h6"
                color="#154078"
                key={`tag-${index}`}
                noWrap
              >
                #{tag}
              </Typography>
            ))}
          </div>
          <div className="post-card__actions-info">
            <span>
              <IconButton disabled={likesCount === 0} onClick={openLikesDialog}>
                <Box
                  component="img"
                  src={LikeIcon}
                  sx={{
                    height: "2rem",
                    width: "2rem",
                    margin: "1rem",
                    cursor: "pointer",
                  }}
                />
                {likesCount}{" "}
                {likesCount === 0 || likesCount === 1 ? "like" : "likes"}
              </IconButton>
            </span>

            <span>
              <Box
                component="img"
                src={CommentIcon}
                sx={{ height: "1.8rem", width: "1.8rem", cursor: "pointer" }}
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
              <Box
                component="img"
                onClick={handleUpdateLikes}
                src={LikeIcon}
                sx={{
                  height: "2rem",
                  width: "2rem",
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
                  margin: "1rem",
                  cursor: "pointer",
                }}
              />
            )}
          </span>
          <span className="action-items">
            <Box
              component="img"
              src={CommentIcon}
              sx={{ height: "1.8rem", width: "1.8rem", cursor: "pointer" }}
            />
          </span>
        </div>
      </div>

      <Comments
        comments={post?.comments}
        postId={id}
        profile_pic={post?.profile_pic}
      />
      <div className="nearby-location-section">
        <NearbyLocation locationOptions={getNearbyLocations()} />
      </div>
    </Fragment>
  );
}

export default DetailPostCard;
