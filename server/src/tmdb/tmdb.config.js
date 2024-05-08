const baseurl = process.env.TMDB_BASEURL; // 'https://api.themoviedb.org/3'
const key = process.env.TMDB_API_KEY; // 'your_api_key' 

const getUrl = (endpoint, params) => {
    const queryString = new URLSearchParams(params);

    return `${baseurl}${endpoint}?api_key=${key}&${queryString}`;
}

export default { getUrl };