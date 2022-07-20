import { useEffect, useRef } from "react";
import { useState } from "react";
import { IMG_BASE_URL } from "../utils/appUtils";

const Poster = ({ posterId, isLargePoster, movie, onImgError }) => {
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
        <div
          className={`${posterClassName} bg-secondary bg-opacity-50 placeholder-wave`}
          style={{ minWidth: isLargePoster ? "170px" : "240px" }}
        ></div>
      )}
      <img
        data-poster={posterId}
        className={`d-inline-block ${posterClassName} ${
          fetched ? "visible" : "hidden"
        }`}
        src={`${IMG_BASE_URL}${
          isLargePoster
            ? movie?.poster_path || movie?.backdrop_path || ""
            : movie?.backdrop_path || movie?.poster_path || ""
        }`}
        ref={imgRef}
        onError={onImgError}
        alt={""}
      />
    </>
  );
};

export default Poster;
