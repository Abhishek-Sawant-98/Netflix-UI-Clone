import movieTrailer from "movie-trailer";

export const getVideoId = async (movieName) => {
  return await movieTrailer(movieName, {
    id: true,
  });
};
