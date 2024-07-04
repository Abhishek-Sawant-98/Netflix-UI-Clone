import { NETFLIX_ORIGINALS } from "./movies";

const { VITE_TMDB_API_KEY: apiKey } = import.meta.env;

const requests = [
    {
        url: `/discover/tv?api_key=${apiKey}&with_networks=213`,
        title: NETFLIX_ORIGINALS,
        isLargePoster: true,
    },
    {
        url: `/trending/all/week?api_key=${apiKey}&language=en-US`,
        title: "Trending Now",
    },
    {
        url: `/movie/top_rated?api_key=${apiKey}&language=en-US`,
        title: "Top Rated",
    },
    {
        url: `/discover/movie?api_key=${apiKey}&with_genres=28`,
        title: "Action Movies",
    },
    {
        url: `/discover/movie?api_key=${apiKey}&with_genres=35`,
        title: "Comedy Movies",
    },
    {
        url: `/discover/movie?api_key=${apiKey}&with_genres=27`,
        title: "Horror Movies",
    },
    {
        url: `/discover/movie?api_key=${apiKey}&with_genres=10749`,
        title: "Romance Movies",
    },
    {
        url: `/discover/movie?api_key=${apiKey}&with_genres=99`,
        title: "Documentaries",
    },
];

export default requests;
