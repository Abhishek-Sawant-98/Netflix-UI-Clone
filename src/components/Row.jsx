import React, { useState, useEffect } from "react";
import api from "../utils/axios";
import "../css/Row.css";

const imgBaseUrl = "https://image.tmdb.org/t/p/original";

const Row = ({ title, fetchUrl, isLargePoster }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await api.get(fetchUrl);
      setMovies(response.data.results);
    };
    fetchMovies();
  }, [fetchUrl]);

  return (
    <section className="container-fluid row">
      <h2 className="row__title">{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            className={`row__poster${isLargePoster ? " row__largePoster" : ""}`}
            key={movie.id}
            src={`${imgBaseUrl}${
              isLargePoster
                ? movie?.poster_path || movie.backdrop_path
                : movie?.backdrop_path || movie.poster_path
            }`}
            alt={movie.title || movie.name}
          />
        ))}
      </div>
    </section>
  );
};

export default Row;
