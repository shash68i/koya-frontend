import React, { useEffect, useMemo, useState } from "react";
import "./LocationPosts.css";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPostsByLocation } from "../../core/slices/postSlice";
import { CircularProgress, Typography } from "@mui/material";
import PostCard from "../PostCard";
import { allLocations } from "../../location";
import Suggestion from "../Suggestion";

function LocationPosts() {
  const dispatch = useDispatch();
  const { location } = useParams();

  const loading = useSelector((state) => state.post.loading);
  const filteredPosts = useSelector((state) => state.post.filteredPosts);
  const posts = useSelector((state) => state.post.posts);

  useEffect(() => {
    dispatch(getPostsByLocation(location));
  }, []);

  const saved_locations = posts
    .map((post) => post.location)
    .reduce(function (acc, curr) {
      if (!acc.includes(curr)) acc.push(curr);
      return acc;
    }, []);

  const getRandomLocations = useMemo(() => {
    const n1 = Math.floor(Math.random() * allLocations.length);
    const n2 = Math.floor(Math.random() * allLocations.length);
    const min = n1 < n2 ? n1 : n2;
    const max = n1 > n2 ? n1 : n2;
    const locationList = allLocations.slice(min, max).slice(0, 7);
    return locationList;
  }, []);

  const suggest_locations = [...saved_locations, ...getRandomLocations];

  console.log(filteredPosts, "filtered posts");

  return loading ? (
    <div className="circular-progress">
      <CircularProgress />
    </div>
  ) : (
    <div className="container posts-container">
      <div className="card-section">
        {filteredPosts?.length > 0 ? (
          filteredPosts.map((post) => (
            <PostCard className="card-image-top" post={post} key={post._id} />
          ))
        ) : (
          <div className="post-card empty-posts">
            <Typography variant="h5" fontSize={20}>
              No Posts For this location
            </Typography>
          </div>
        )}
      </div>

      <div className="suggest-section">
        <Suggestion locationOptions={suggest_locations} />
      </div>
    </div>
  );
}

export default LocationPosts;
