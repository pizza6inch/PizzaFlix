import responseHandler from "../handlers/response.handler";
import tmdbApi from "../tmdb/tmdb.api"; // direactly fetch data since we are not saving it to the database

const personDetail = async (req, res) => {
    try {
        const { personId } = req.params;

        const person = await tmdbApi.PersonDetail({ personId });

        responseHandler.ok(res, person);
    } catch {
        responseHandler.error(res);
    }
};

const personMedias = async (req, res) => {
    try {
        const { personId } = req.params;

        const medias = await tmdbApi.PersonMedias({ personId });

        responseHandler.ok(res, medias);
    } catch {
        responseHandler.error(res);
    }
}

export default { personDetail, personMedias };
