import React from "react";
import "./Poster.css";

const imgBaseUrl = "https://image.tmdb.org/t/p/original";

const Poster = ({ posterId, getHoveredPosterId, isLargePoster, movie }) => {
  return (
    <img
      onMouseEnter={() => {
        getHoveredPosterId(posterId);
      }}
      onMouseLeave={() => {}}
      className={`row__poster ${isLargePoster ? "row__largePoster" : ""}`}
      src={`${imgBaseUrl}${
        isLargePoster
          ? movie?.poster_path || movie.backdrop_path
          : movie?.backdrop_path || movie.poster_path
      }`}
      alt={movie.title || movie.name}
    />
  );
};

export default Poster;
