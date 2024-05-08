import axiosClient from '../axios/axios.client.js';
import tmdbEndpoints from './tmdb.endpoints.js';

const tmdbApi = {
    MediaList: async ({ mediaType, mediaCategory, page }) => await axiosClient.get(
        tmdbEndpoints.mediaList({ mediaType, mediaCategory, page })
    ),
    MediaDetail: async ({ mediaType, mediaId }) => await axiosClient.get(
        tmdbEndpoints.mediaDetail({ mediaType, mediaId })
    ),
    MediaGenres: async ({ mediaType }) => await axiosClient.get(
        tmdbEndpoints.mediaGenres({ mediaType })
    ),
    MediaCredits: async ({ mediaType, mediaId }) => await axiosClient.get(
        tmdbEndpoints.mediaCredits({ mediaType, mediaId })
    ),
    MediaVideos: async ({ mediaType, mediaId }) => await axiosClient.get(
        tmdbEndpoints.mediaVideos({ mediaType, mediaId })
    ),
    MediaRecommend: async ({ mediaType, mediaId }) => await axiosClient.get(
        tmdbEndpoints.mediaRecommend({ mediaType, mediaId })
    ),
    MediaImages: async ({ mediaType, mediaId }) => await axiosClient.get(
        tmdbEndpoints.mediaImages({ mediaType, mediaId })
    ),
    MediaSearch: async ({ mediaType, query, page }) => await axiosClient.get(
        tmdbEndpoints.mediaSearch({ mediaType, query, page })
    ),
    PersonDetail: async ({ personId }) => await axiosClient.get(
        tmdbEndpoints.personDetail({ personId })
    ),
    PersonMedias: async ({ personId }) => await axiosClient.get(
        tmdbEndpoints.personMedias({ personId })
    ),
};

export default tmdbApi;