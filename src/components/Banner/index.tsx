import { useState, useEffect, useRef, useMemo } from "react";
import { VITE_IMG_BASE_URL, truncateString } from "../../utility/app";
import api from "../../config/axios";
import requests from "../../config/requests";
import { setMovieName, setTrailerId } from "../../redux/slices/AppSlice";
import ModalButton from "../ModalButton";
import { getVideoIdFromMovie } from "../../utility/movieTrailer";
import { useAppDispatch } from "../../redux/hooks";
import { Movie } from "../../config/AppTypes";
import './index.scss';

const Banner = () => {
    const btnShowAlert = useRef<HTMLButtonElement>();
    const btnShowTrailer = useRef<HTMLButtonElement>();
    const dispatch = useAppDispatch();
    const [bannerMovie, setBannerMovie] = useState<Movie>();
    const bannerTitle = useMemo(() => {
        let bTitle = "";
        if( bannerMovie ) {
            const { name, title, original_name } = bannerMovie;
            bTitle = name ?? title ?? original_name ?? "";
        }
        return bTitle;
    }, [bannerMovie]);

    const bannerOverview = useMemo(() => {
        return bannerMovie ? bannerMovie.overview : "";
    }, [bannerMovie])

    const fetchBannerMovie = async () => {
        const [bannerMovie] = requests;
        const { data } = await api.get(bannerMovie.url);
        const movies = data.results;

        // Set a random 'netflix originals' movie as banner
        setBannerMovie(movies[Math.floor(Math.random() * (movies.length - 1))]);
    };

    useEffect(() => {
        fetchBannerMovie();
    }, []);

    const playBannerMovieTrailer = async () => {
        if (!bannerMovie) return;
        try {
            const movieName = bannerMovie.name;
            const videoId = await getVideoIdFromMovie(movieName);
            if (videoId) {
                dispatch(setTrailerId(videoId));
                dispatch(setMovieName(movieName));
                btnShowTrailer.current?.click();
            } else {
                btnShowAlert.current?.click();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <section
            className="banner"
            style={
                {
                    backgroundImage: `url(${VITE_IMG_BASE_URL}${bannerMovie?.backdrop_path || ""})`
                }
            }
        >
            <div className="banner__contents">
                <h1 className="banner__title" title={bannerTitle}>
                    {truncateString(bannerTitle, 25)}
                </h1>
                <p className="overview" title={bannerOverview}>
                    {truncateString(bannerOverview, 130)}
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
