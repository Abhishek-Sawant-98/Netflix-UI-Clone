import movieTrailer from 'movie-trailer';

export const getVideoId = async ( movieName ) => movieTrailer( movieName, {
	id: true,
} );
