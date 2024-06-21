const mediaType = {
    movie: 'movie',
    tv: 'tv',
}

const mediaCategory = {
    popular: 'popular',
    top_rated: 'top_rated'
}

const backdropPath = (imgEndpoints) => `https://image.tmdb.org/t/p/original${imgEndpoints}`;