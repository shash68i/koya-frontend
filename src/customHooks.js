import { useEffect, useCallback, useRef } from "react";
import { getPosts, postActions } from "./core/slices/postSlice";

// make API calls and pass the returned data via dispatch
export const useFetch = (page, dispatch) => {
  useEffect(() => {
    dispatch(getPosts(page));
  }, [page]);
};

export const useInfiniteScroll = (scrollRef, dispatch) => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          dispatch(postActions.infiniteScrollAddPage());
        }
      });
    });

    if (scrollRef.current) {
      observer.observe(scrollRef.current)
    }
  }, [scrollRef,dispatch]);
};

// lazy load images with intersection observer
export const useLazyLoading = (imgSelector, items) => {
  const imgObserver = useCallback((node) => {
    const intObs = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.intersectionRatio > 0) {
          const currentImg = en.target;
          const newImgSrc = currentImg.dataset.src;
          // only swap out the image source if the new url exists
          if (!newImgSrc) {
            console.error("Image source is invalid");
          } else {
            currentImg.src = newImgSrc;
          }
          intObs.unobserve(node); // detach the observer when done
        }
      });
    });
    intObs.observe(node);
  }, []);
  const imagesRef = useRef(null);
  useEffect(() => {
    imagesRef.current = document.querySelectorAll(imgSelector);
    if (imagesRef.current) {
      imagesRef.current.forEach((img) => imgObserver(img));
    }
  }, [imgObserver, imagesRef, imgSelector, items]);
};
