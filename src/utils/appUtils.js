// Optimization method to cache and retrieve the results
// of pure functions, instead of recalculating again
export const memoize = (func) => {
  const cachedResults = {};

  return (...args) => {
    // To generate a unique key for each input args array
    const argsKey = JSON.stringify(...args);

    // For the 1st time, calculate and cache the new result
    if (!cachedResults[argsKey]) {
      cachedResults[argsKey] = func(...args);
    }
    // Else retrieve and return the old cached result
    return cachedResults[argsKey];
  };
};

// Convert a normal function to a 'debounced' function
export const throttle = (func, interval = 500) => {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
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

export const truncateString = (str, maxLength) => {
  if (!str || !str.length || str === "undefined") return "Loading...";
  return str.length > maxLength ? str.substring(0, maxLength) + "..." : str;
};

// Memoizing the below methods as they are called with the same
// argument more than once
export const getBannerTitle = memoize(
  (movie) => movie?.name || movie?.title || movie?.original_name
);

export const getBannerOverview = memoize((movie) => movie?.overview);

export const IMG_BASE_URL = "https://image.tmdb.org/t/p/original";

export const NETFLIX_LOGO =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/799px-Netflix_2015_logo.svg.png?20190206123158";

export const USER_AVATAR =
  "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117";
