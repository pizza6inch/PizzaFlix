const mediaType = {
    movie: 'movie',
    tv: 'tv',
}

const mediaCategory = {
    popular: 'popular',
    top_rated: 'top_rated'
}

const backdropPath = (imgEndpoints) => `https://image.tmdb.org/t/p/original${imgEndpoints}`;

const posterPath = (imgEndpoints) => `https://image.tmdb.org/t/p/w500${imgEndpoints}`;

const youtubePath = (videoId) => `https://www.youtube.com/embed/${videoId}?controls=0`;

const tmdbConfigs = {
    mediaType,
    mediaCategory,
    backdropPath,
    posterPath,
    youtubePath
}

export default tmdbConfigs;