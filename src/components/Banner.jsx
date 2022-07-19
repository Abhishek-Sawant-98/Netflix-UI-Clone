import { useState, useEffect } from "react";
import {
  getBannerOverview,
  getBannerTitle,
  IMG_BASE_URL,
  truncateString,
} from "../utils/appUtils";
import api from "../utils/axios";
import requests from "../utils/requests";

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
        backgroundImage: `url(${IMG_BASE_URL}/${
          bannerMovie?.backdrop_path || ""
        })`,
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title" title={getBannerTitle(bannerMovie)}>
          {truncateString(getBannerTitle(bannerMovie), 25)}
        </h1>
        <p className="overview" title={getBannerOverview(bannerMovie)}>
          {truncateString(getBannerOverview(bannerMovie), 130)}
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
