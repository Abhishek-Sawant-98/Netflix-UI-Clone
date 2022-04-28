import React, { useState, useEffect, useRef } from "react";
import api from "../../utils/axios";
import Poster from "../Poster/Poster";
import "./Row.css";

const Row = ({ title, fetchUrl, isLargePoster }) => {
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

  const scrollCheck = () => {
    setScrollX(sliderRef.current.scrollLeft);
    updateScrollEnd();
  };

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await api.get(fetchUrl);
      setMovies(response.data.results);
    };
    fetchMovies();
  }, [fetchUrl]);

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
        onMouseEnter={() => setSliderVisibility(true)}
        onMouseLeave={() => setSliderVisibility(false)}
      >
        {scrollX !== 0 && sliderVisibility && (
          <i
            className="bi bi-chevron-left movie-sliders"
            onClick={() => shiftSlider(-5)}
          ></i>
        )}
        <div
          className="slider-row"
          ref={sliderRef}
          onScroll={scrollCheck}
        >
          {movies.map((movie) => (
            <Poster
              key={movie.id}
              posterId={movie.id}
              sliderRow={sliderRef}
              isLargePoster={isLargePoster}
              movie={movie}
            />
          ))}
        </div>
        {!scrollEnd && sliderVisibility && (
          <i
            className="bi bi-chevron-right movie-sliders"
            onClick={() => shiftSlider(5)}
          ></i>
        )}
      </div>
    </section>
  );
};

export default Row;
