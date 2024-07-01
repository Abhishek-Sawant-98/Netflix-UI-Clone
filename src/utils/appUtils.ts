// Optimization method to cache and retrieve the results

import { Movie } from "./AppTypes";

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

// Memoizing the below methods as they are called with the same
// argument more than once
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
  return movieName === "Parasite"
    ? "isOGD_7hNIY"
    : movieName === "Lucifer"
    ? "ueMwVGBwqRo"
    : movieName === "Money Heist"
    ? "_InqQJRqGW4"
    : movieName === "Sex Education"
    ? "zmgYlYw7Uwk"
    : movieName === "Squid Game"
    ? "oqxAJKy0ii4"
    : movieName === "All of Us Are Dead"
    ? "IN5TD4VRcSM"
    : movieName === "Boo, Bitch"
    ? "1hWE2ZJxb4c"
    : movieName === "Man Vs Bee"
    ? "YQ1vN_91KO0"
    : movieName === "Money Heist: Korea - Joint Economic Area"
    ? "Uafg97czxeQ"
    : movieName === "The Umbrella Academy"
    ? "0DAmWHxeoKw"
    : movieName === "The Naked Director"
    ? "bUzxiWLH60I"
    : videoId;
};

export const getBannerOverview = memoize((movie: Movie) => movie?.overview);

export const IMG_BASE_URL = import.meta.env.VITE_IMG_BASE_URL;
export const NETFLIX_LOGO = import.meta.env.VITE_NETFLIX_LOGO;
export const USER_AVATAR = import.meta.env.VITE_USER_AVATAR;
