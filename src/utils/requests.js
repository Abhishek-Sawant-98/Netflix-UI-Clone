const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const requests = [
  {
    url: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
    title: "NETFLIX ORIGINALS",
    isLargePoster: true,
  },
  {
    url: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    title: "Trending Now",
  },
  {
    url: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    title: "Top Rated",
  },
  {
    url: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    title: "Action Movies",
  },
  {
    url: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    title: "Comedy Movies",
  },
  {
    url: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    title: "Horror Movies",
  },
  {
    url: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    title: "Romance Movies",
  },
  {
    url: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
    title: "Documentaries",
  },
];

export default requests;
