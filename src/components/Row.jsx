import movieTrailer from "movie-trailer";
import { useState, useEffect, useRef } from "react";
import {
  getUpdatedVideoId,
  isTrailerNotAvailable,
  throttle,
} from "../utils/appUtils";
import api from "../utils/axios";
import Poster from "./Poster";
import { useDispatch } from "react-redux";
import { setMovieName, setTrailerId } from "../redux/slices/AppSlice";
import ModalButton from "./ModalButton";

const Row = ({ title, fetchUrl, isLargePoster }) => {
  const dispatch = useDispatch();
  const btnShowAlert = useRef();
  const btnShowTrailer = useRef();
  const [movies, setMovies] = useState([]);
  const [sliderVisibility, setSliderVisibility] = useState(false);
  const [scrollX, setScrollX] = useState(0);
  const [scrollEnd, setScrollEnd] = useState(false);

  const sliderRef = useRef();

  const updateScrollEnd = () => {
    if (
      Math.floor(
        sliderRef.current.scrollWidth - sliderRef.current.scrollLeft
      ) <= sliderRef.current.offsetWidth
    ) {
      setScrollEnd(true);
    } else {
      setScrollEnd(false);
    }
  };

  const shiftSlider = (shift) => {
    let scrolledDistance = 0;
    const slideVar = setInterval(() => {
      sliderRef.current.scrollLeft += shift;
      setScrollX(scrollX + shift);
      updateScrollEnd();
      scrolledDistance += shift < 0 ? -shift : shift;
      if (scrolledDistance >= 500) {
        clearInterval(slideVar);
      }
    }, 1);
  };

  const slideToLeft = () => shiftSlider(-10);
  const slideToRight = () => shiftSlider(10);

  const showSlider = () => setSliderVisibility(true);
  const hideSlider = () => setSliderVisibility(false);

  const scrollCheck = () => {
    setScrollX(sliderRef.current.scrollLeft);
    updateScrollEnd();
  };

  const fetchMovies = async () => {
    const {
      data: { results },
    } = await api.get(fetchUrl);
    // console.log(results);
    setMovies(results);
  };

  useEffect(() => {
    fetchMovies();
  }, [fetchUrl]);

  const reloadPage = throttle(() => {
    window.location.reload();
  }, 1000);

  const onImgError = (e) => {
    e.target.src = `https://via.placeholder.com/${
      e.target.height === 250 ? "100x250" : "220x140"
    }`;
    reloadPage();
  };

  return (
    <section className="row">
      <h2
        className="row__title"
        style={{
          marginBottom: `${title === "NETFLIX ORIGINALS" ? "-30px" : "-5px"}`,
        }}
      >
        {title}
      </h2>
      <div
        className="row__posters"
        onMouseEnter={showSlider}
        onMouseLeave={hideSlider}
      >
        {scrollX !== 0 && sliderVisibility && (
          <i
            className="bi bi-chevron-left movie-sliders"
            onClick={slideToLeft}
          ></i>
        )}
        <div
          // Event Delegation
          onClick={async (e) => {
            try {
              const movie = e.target?.dataset?.movieName;
              if (!movie) return;
              let videoId = await movieTrailer(movie, {
                id: true,
              });
              if (isTrailerNotAvailable(videoId, movie)) {
                return btnShowAlert?.current?.click();
              }
              videoId = getUpdatedVideoId(videoId, movie);
              dispatch(setTrailerId(videoId));
              dispatch(setMovieName(movie));
              btnShowTrailer?.current?.click();
            } catch (error) {
              console.log(error);
            }
          }}
          className="slider-row"
          ref={sliderRef}
          onScroll={scrollCheck}
        >
          {movies.map((movie) => (
            <Poster
              key={movie?.id}
              sliderRow={sliderRef}
              isLargePoster={isLargePoster}
              movie={movie}
              onImgError={onImgError}
            />
          ))}
        </div>
        {!scrollEnd && sliderVisibility && (
          <i
            className="bi bi-chevron-right movie-sliders"
            onClick={slideToRight}
          ></i>
        )}
      </div>
      <ModalButton targetModal={"trailerModal"} ref={btnShowTrailer} />
      <ModalButton targetModal={"alertModal"} ref={btnShowAlert} />
    </section>
  );
};

export default Row;
