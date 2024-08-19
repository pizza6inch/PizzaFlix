const baseurl = process.env.TMDB_BASE_URL // 'https://api.themoviedb.org/3'
const key = process.env.TMDB_API_KEY // 'your_api_key'

const getUrl = (endpoint, params) => {
  const queryString = new URLSearchParams(params) // page=1
  //console.log(`GET URL:${baseurl}${endpoint}?api_key=${key}&${queryString}`)
  return `${baseurl}${endpoint}?api_key=${key}&${queryString}` // 'https://api.themoviedb.org/3/endpoint?api_key=your_api_key&page=1'
}

export default { getUrl }
