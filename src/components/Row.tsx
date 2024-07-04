import React, { useState, useEffect, useRef } from "react";
import { getUpdatedVideoId, isTrailerNotAvailable } from "../utils/appUtils";
import api from "../utils/axios";
import Poster from "./Poster";
import { setMovieName, setTrailerId } from "../store/slices/AppSlice";
import ModalButton from "./ModalButton";
import { useAppDispatch } from "../store/StoreHooks";
import { getVideoId } from "../utils/movieTrailer";
import { Movie } from "../utils/AppTypes";

interface Props {
    title: string;
    fetchUrl: string;
    isLargePoster: boolean;
}

const Row = ({ title, fetchUrl, isLargePoster }: Props) => {
    const dispatch = useAppDispatch();
    const btnShowAlert = useRef<HTMLButtonElement>();
    const btnShowTrailer = useRef<HTMLButtonElement>();
    const [movies, setMovies] = useState<Movie[]>([]);
    const [sliderVisibility, setSliderVisibility] = useState<boolean>(false);
    const [scrollX, setScrollX] = useState<number>(0);
    const [scrollEnd, setScrollEnd] = useState<boolean>(false);

    const sliderRef = useRef<HTMLDivElement>();

    const updateScrollEnd = () => {
        if (!sliderRef?.current) return;
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

    const shiftSlider = (shift: number) => {
        let scrolledDistance = 0;
        const slideVar = setInterval(() => {
            if (!sliderRef?.current) return;
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
        if (!sliderRef?.current) return;
        setScrollX(sliderRef.current.scrollLeft);
        updateScrollEnd();
    };

    const fetchMovies = async () => {
        const {
            data: { results },
        } = await api.get(fetchUrl);
        setMovies(results);
    };

    useEffect(() => {
        fetchMovies();
    }, [fetchUrl]);

    const onImgError = (e: MouseEvent) => {
        if (!e?.target) return;
        const imgTarget = e.target as HTMLImageElement;
        imgTarget.onerror = null;
        imgTarget.src = `https://via.placeholder.com/${imgTarget.height === 250 ? "100x250" : "220x140"
            }`;
    };

    const onPosterClick: React.MouseEventHandler<HTMLDivElement> = async (e) => {
        try {
            const movie = (e.target as HTMLElement)?.dataset?.movieName;
            if (!movie) return;
            let videoId = await getVideoId(movie);
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
                    onClick={onPosterClick}
                    className="slider-row"
                    ref={sliderRef as React.LegacyRef<HTMLDivElement>}
                    onScroll={scrollCheck}
                >
                    {movies.map((movie) => (
                        <Poster
                            key={movie?.id}
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
