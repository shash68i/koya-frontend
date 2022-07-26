import { CircularProgress, Dialog, Paper, Typography } from "@mui/material";
import React from "react";

import { PostCard, Suggestion } from "../../components";
import { getPosts } from "../../core/slices/postSlice";

import "./Home.css";
import useStateUtils from "./utils/stateUtils";

export default function Home() {
  const { loading, fetched, posts, suggest_locations, bottomBoundaryRef } =
    useStateUtils();

  return (
    <div className="container posts-container">
      <div className="card-section">
        {posts.map((post) => (
          <PostCard className="card-image-top" post={post} key={post._id} />
        ))}

        {!fetched ? (
          <div
            id="page-bottom-boundary"
            ref={bottomBoundaryRef}
            className="infinite-scroll-progress"
          >
            <CircularProgress />
          </div>
        ) : null}
      </div>

      <div className="suggest-section">
        <Suggestion locationOptions={suggest_locations} />
      </div>
    </div>
  );
}
