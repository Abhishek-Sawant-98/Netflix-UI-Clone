import React, { useEffect, useRef, useState } from "react";
import { Movie } from "../../config/AppTypes";
import { VITE_IMG_BASE_URL } from "../../utility/app";
import './index.scss';

interface Props {
    isLargePoster: boolean;
    movie: Movie;
    onImgError: Function;
}

const Poster = ({ isLargePoster, movie, onImgError }: Props) => {
    const [fetched, setFetched] = useState<boolean>(false);
    const imgRef = useRef<HTMLImageElement>();
    const posterClassName = `row__poster ${isLargePoster ? "row__largePoster" : ""
        }`;
    const { name, original_name, title, original_title } = movie;
    const movieName = name || original_name || title || original_title || "";

    useEffect(() => {
        if (imgRef?.current?.complete) {
            setFetched(true);
        }
    });

    return (
        <>
            {!fetched && (
                <div
                    title={`${movieName}\n(Click To Watch Trailer)`}
                    data-movie-name={movieName}
                    className={`${posterClassName} bg-secondary bg-opacity-50 placeholder-wave`}
                    style={{ minWidth: isLargePoster ? "170px" : "240px" }}
                ></div>
            )}
            <img
                title={`${movieName}\n(Click To Watch Trailer)`}
                data-movie-name={movieName}
                className={`d-inline-block ${posterClassName} ${fetched ? "visible" : "hidden"
                    }`}
                src={`${VITE_IMG_BASE_URL}${isLargePoster
                    ? movie?.poster_path || movie?.backdrop_path || ""
                    : movie?.backdrop_path || movie?.poster_path || ""
                    }`}
                ref={imgRef as React.LegacyRef<HTMLImageElement>}
                onError={onImgError as React.ReactEventHandler<HTMLImageElement>}
                alt={""}
            />
        </>
    );
};

export default Poster;
