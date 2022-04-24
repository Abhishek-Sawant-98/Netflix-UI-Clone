import React, { useState, useEffect } from "react";
import api from "../utils/axios";
import requests from "../utils/requests";
import "../css/Banner.css";

const imgBaseUrl = "https://image.tmdb.org/t/p/original";

const Banner = () => {
  const [bannerMovie, setBannerMovie] = useState({});

  useEffect(() => {
    const fetchBannerMovie = async () => {
      const response = await api.get(requests.fetchNetflixOriginals);
      const movies = response.data.results;
      // Set a random netflix originals movie as banner
      setBannerMovie(movies[Math.floor(Math.random() * (movies.length - 1))]);
      return response;
    };
    fetchBannerMovie();
  }, []);

  const truncateString = (str, maxLength) => {
    return str?.length > maxLength ? str?.substring(0, maxLength) + "..." : str;
  };

  return (
    <section
      className="banner"
      style={{
        backgroundImage: `url(${imgBaseUrl}${bannerMovie?.backdrop_path})`,
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {bannerMovie?.name ||
            bannerMovie?.title ||
            bannerMovie?.original_name}
        </h1>
        <p className="overview">{truncateString(bannerMovie.overview, 150)}</p>
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
