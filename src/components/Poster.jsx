import { useEffect, useRef, useState } from "react";
import { IMG_BASE_URL } from "../utils/appUtils";

const Poster = ({ isLargePoster, movie, onImgError }) => {
  const [fetched, setFetched] = useState(false);
  const imgRef = useRef();
  const posterClassName = `row__poster ${
    isLargePoster ? "row__largePoster" : ""
  }`;
  const { name, original_name, title, original_title } = movie;
  const movieName = name || original_name || title || original_title || "";

  useEffect(() => {
    if (imgRef?.current?.complete) {
      setFetched(true);
    }
  });

  return (
    <>
      {!fetched && (
        <div
          title={`${movieName}\n(Click To Watch Trailer)`}
          data-movie-name={movieName}
          className={`${posterClassName} bg-secondary bg-opacity-50 placeholder-wave`}
          style={{ minWidth: isLargePoster ? "170px" : "240px" }}
        ></div>
      )}
      <img
        title={`${movieName}\n(Click To Watch Trailer)`}
        data-movie-name={movieName}
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
