import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as Yup from "yup";

import { useDispatch, useSelector } from "react-redux";
import {
  useFetch,
  useInfiniteScroll,
  useLazyLoading,
} from "../../../customHooks";
import { allLocations } from "../../../location";

const useStateUtils = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);
  const page = useSelector((state) => state.post.page);
  const fetched = useSelector((state) => state.post.fetched);
  const filteredPosts = useSelector((state) => state.post.filteredPosts);
  const loading = useSelector((state) => state.post.loading);


  let bottomBoundaryRef = useRef();
  useFetch(page, dispatch);
  useLazyLoading(".card-img-top", posts);
  useInfiniteScroll(bottomBoundaryRef, dispatch);

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

  return {
    fetched,
    posts,
    bottomBoundaryRef,
    loading,
    filteredPosts,
    suggest_locations,
  };
};

export default useStateUtils;
