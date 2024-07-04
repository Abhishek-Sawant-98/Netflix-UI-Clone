import movieTrailer from 'movie-trailer';
import { videoIds } from '../config/movies.ts';

/**
 * Fetches the corresponding video id of the passed movie
 * @param {string} movieName Name of the movie
 * @returns {Promise<string>} video id of the corresponding movie
 */
export const getVideoIdFromMovie = async ( movieName ) => {
	const videoId = await movieTrailer( movieName, { id: true } );
	return videoId ?? videoIds[ movieName ];
};
