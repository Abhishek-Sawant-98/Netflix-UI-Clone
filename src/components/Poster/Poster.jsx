import React, {useState} from "react";
import "./Poster.css";

const imgBaseUrl = "https://image.tmdb.org/t/p/original";

const Poster = ({ posterId, getHoveredPosterId, isLargePoster, movie }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <img
      onMouseEnter={() => {
        getHoveredPosterId(posterId);
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
      id={`${hovered ? 'hovered-poster' : ''}`}
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
