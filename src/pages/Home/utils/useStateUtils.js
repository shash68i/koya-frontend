import { useMemo, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  useFetch,
  useInfiniteScroll,
  useLazyLoading,
} from "../../../customHooks";
import { allLocations } from "../../../location";

const useStateUtils = () => {
  const dispatch = useDispatch();
  const { posts, page, fetched, filteredPosts, loading } = useSelector(
    (state) => state.post
  );

  let bottomBoundaryRef = useRef();
  useFetch(page, dispatch);
  useLazyLoading(".card-img-top", posts);
  useInfiniteScroll(bottomBoundaryRef, dispatch);

  const getRandomLocations = useMemo(() => {
    const n1 = Math.floor(Math.random() * allLocations.length);
    const n2 = Math.floor(Math.random() * allLocations.length);
    const min = n1 < n2 ? n1 : n2;
    const max = n1 > n2 ? n1 : n2;
    const locationList = allLocations.slice(min, max).slice(0, 10);
    return locationList;
  }, []);

  const suggestLocations = [...getRandomLocations];

  return {
    fetched,
    posts,
    bottomBoundaryRef,
    loading,
    filteredPosts,
    suggestLocations,
  };
};

export default useStateUtils;
