import React, { useState, useEffect } from "react";
import api from "../../utils/axios";
import requests from "../../utils/requests";
import memoize from "../../utils/memoize";
import "./Banner.css";

const imgBaseUrl = "https://image.tmdb.org/t/p/original";

const truncateString = (str, maxLength) => {
  if (!str || !str.length || str === "undefined") return "Loading...";
  return str.length > maxLength ? str.substring(0, maxLength) + "..." : str;
};

// Memoizing the below methods as they are called with the same
// argument more than once
const getBannerTitle = memoize(
  (movie) => movie?.name || movie?.title || movie?.original_name
);

const getBannerOverview = memoize((movie) => movie?.overview);

// Component
const Banner = () => {
  const [bannerMovie, setBannerMovie] = useState({});

  useEffect(() => {
    const fetchBannerMovie = async () => {
      const response = await api.get(requests.fetchNetflixOriginals);
      const movies = response.data.results;

      // Set a random netflix originals movie as banner
      setBannerMovie(movies[Math.floor(Math.random() * (movies.length - 1))]);
    };
    fetchBannerMovie();
  }, []);

  return (
    <section
      className="banner"
      style={{
        backgroundImage: `url(${imgBaseUrl}${bannerMovie?.backdrop_path})`,
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title" title={getBannerTitle(bannerMovie)}>
          {truncateString(getBannerTitle(bannerMovie), 40)}
        </h1>
        <p className="overview" title={getBannerOverview(bannerMovie)}>
          {truncateString(getBannerOverview(bannerMovie), 170)}
        </p>
        <div className="banner__buttons">
          <button className="banner__button" id="play">
            <i className="bi bi-play-fill"></i>Play
          </button>
          <button className="banner__button" id="info">
            <i className="bi bi-info-circle"></i> &nbsp;More Info
          </button>
        </div>
      </div>
      <div className="banner--fadeBottom"></div>
    </section>
  );
};

export default Banner;
