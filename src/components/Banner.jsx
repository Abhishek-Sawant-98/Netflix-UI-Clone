import movieTrailer from "movie-trailer";
import { useState, useEffect, useRef } from "react";
import {
  getBannerOverview,
  getBannerTitle,
  getUpdatedVideoId,
  IMG_BASE_URL,
  isTrailerNotAvailable,
  truncateString,
} from "../utils/appUtils";
import api from "../utils/axios";
import requests from "../utils/requests";
import { useDispatch } from "react-redux";
import { setMovieName, setTrailerId } from "../store/slices/AppSlice";
import ModalButton from "./ModalButton";

const Banner = () => {
  const btnShowAlert = useRef();
  const btnShowTrailer = useRef();
  const dispatch = useDispatch();
  const [bannerMovie, setBannerMovie] = useState({});

  const fetchBannerMovie = async () => {
    const { data } = await api.get(requests[0].url);
    const movies = data.results;

    // Set a random 'netflix originals' movie as banner
    setBannerMovie(movies[Math.floor(Math.random() * (movies.length - 1))]);
  };

  useEffect(() => {
    fetchBannerMovie();
  }, []);

  const playBannerMovieTrailer = async () => {
    try {
      const movieName = bannerMovie?.name;
      let videoId = await movieTrailer(movieName, {
        id: true,
      });
      if (isTrailerNotAvailable(videoId, movieName)) {
        return btnShowAlert?.current?.click();
      }
      videoId = getUpdatedVideoId(videoId, movieName);
      dispatch(setTrailerId(videoId));
      dispatch(setMovieName(movieName));
      btnShowTrailer?.current?.click();
    } catch (error) {
      console.log(error);
    }
  };

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
          <button
            onClick={playBannerMovieTrailer}
            className="banner__button"
            id="play"
          >
            <i className="bi bi-play-fill"></i>Play
          </button>
          <button className="banner__button" id="info">
            <i className="bi bi-info-circle"></i> &nbsp;More Info
          </button>
        </div>
      </div>
      <div className="banner--fadeBottom"></div>
      <ModalButton targetModal={"trailerModal"} ref={btnShowTrailer} />
      <ModalButton targetModal={"alertModal"} ref={btnShowAlert} />
    </section>
  );
};

export default Banner;
