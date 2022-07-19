import { useEffect, useRef } from "react";
import { useState } from "react";
import { IMG_BASE_URL } from "../utils/appUtils";

const Poster = ({ posterId, isLargePoster, movie }) => {
  const [fetched, setFetched] = useState(false);
  const imgRef = useRef();
  const posterClassName = `row__poster ${
    isLargePoster ? "row__largePoster" : ""
  }`;

  useEffect(() => {
    if (imgRef.current?.complete) {
      setFetched(true);
    }
  });

  return (
    <>
      {!fetched && (
        <div className={`posterClassName`}>
          <p className="bg-light w-100 h-100">image</p>
        </div>
      )}
      <img
        data-poster={posterId}
        className={`d-inline-block ${posterClassName} ${
          fetched ? "visible" : "hidden"
        }`}
        src={`${IMG_BASE_URL}${
          isLargePoster
            ? movie?.poster_path || movie?.backdrop_path
            : movie?.backdrop_path || movie?.poster_path
        }`}
        ref={imgRef}
        onLoad={(e) => {
          console.log("img loaded");
        }}
        onError={(e) => {
          console.log("img error");
        }}
        alt={""}
      />
    </>
  );
};

export default Poster;
