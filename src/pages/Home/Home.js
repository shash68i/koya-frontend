import { CircularProgress } from "@mui/material";
import React from "react";

import { PostCard, Suggestion } from "../../components";

import "./Home.css";
import useStateUtils from "./utils/useStateUtils";

export default function Home() {
  const { posts, suggestLocations, bottomBoundaryRef } =
    useStateUtils();

  return (
    <div className="container posts-container">
      <div className="card-section">
        {posts.map((post) => (
          <PostCard className="card-image-top" post={post} key={post._id} />
        ))}

        {/* If we have very limited posts, use "fetched" variable for conditional rendering of Spinner */}
        <div
          id="page-bottom-boundary"
          ref={bottomBoundaryRef}
          className="infinite-scroll-progress"
        >
          <CircularProgress />
        </div>
      </div>

      <div className="suggest-section">
        <Suggestion locationOptions={suggestLocations} />
      </div>
    </div>
  );
}
