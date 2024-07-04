// Optimization method to cache and retrieve the results

import { Movie } from "../config/AppTypes";

// of pure functions, instead of recalculating again
export const memoize = (func: Function): Function => {
    const cachedResults: any = {};

    return (...args: any[]) => {
        // To generate a unique key for each input args array
        const argsKey = JSON.stringify(args);

        // For the 1st time, calculate and cache the new result
        if (!cachedResults[argsKey]) {
            cachedResults[argsKey] = func(...args);
        }
        // Else retrieve and return the old cached result
        return cachedResults[argsKey];
    };
};

// Convert a normal function to a 'throttled' function
export const throttle = (func: Function, interval: number = 500): Function => {
    let inThrottle: boolean;
    let context = this;
    return function (...args: any[]) {
        if (!inThrottle) {
            func.apply(context, args);
            // To PREVENT control to reach inside this if block
            // for 'interval' ms
            inThrottle = true;
            setTimeout(() => {
                // To ALLOW control to reach inside this if block
                // after 'interval' ms
                inThrottle = false;
            }, interval);
        }
    };
};

export const truncateString = (str: string, maxLength: number): string => {
    if (!str || !str.length || str === "undefined") return "Loading...";
    return str.length > maxLength ? str.substring(0, maxLength) + "..." : str;
};

/**
 * Memoizing the below methods as they are called with the same argument more than once
 */
export const getBannerTitle = memoize(
    (movie: Movie) => movie?.name || movie?.title || movie?.original_name
);

export const isTrailerNotAvailable = (
    videoId: string,
    movieName: string
): boolean => {
    return (
        !videoId &&
        !/^(Sex Education|Money Heist|The Naked Director|Squid Game|All of Us Are Dead|Boo, Bitch|Man Vs Bee|Money Heist: Korea - Joint Economic Area|The Umbrella Academy)$/.test(
            movieName
        )
    );
};

export const getUpdatedVideoId = (
    videoId: string,
    movieName: string
): string => {
    switch (movieName) {
        case "Parasite":
            return "isOGD_7hNIY";

        case "Lucifer":
            return "ueMwVGBwqRo";

        case "Money Heist":
            return "_InqQJRqGW4";

        case "Sex Education":
            return "zmgYlYw7Uwk";

        case "Squid Game":
            return "oqxAJKy0ii4";

        case "All of Us Are Dead":
            return "IN5TD4VRcSM";

        case "Boo, Bitch":
            return "1hWE2ZJxb4c";

        case "Man Vs Bee":
            return "YQ1vN_91KO0";

        case "Money Heist: Korea - Joint Economic Area":
            return "Uafg97czxeQ";

        case "The Umbrella Academy":
            return "0DAmWHxeoKw";

        case "The Naked Director":
            return "bUzxiWLH60I";

        default:
            return "";
    }
};

export const getBannerOverview = memoize((movie: Movie) => movie?.overview);

export const { VITE_IMG_BASE_URL, VITE_NETFLIX_LOGO, VITE_USER_AVATAR } = import.meta.env;