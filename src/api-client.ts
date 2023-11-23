import axios from "axios";
import { API_SERVER_URL } from "./public-config";

export const fetchContests = async () => {
    const resp = await axios.get(`${API_SERVER_URL}/contests`);

    return resp.data.contests
};
export const fetchSingleContests = async (contestId) => {
    const resp = await axios.get(`${API_SERVER_URL}/contest/${contestId}`);

    return resp.data.contest
};
export const addNewNameToContest = async ({
    contestId, 
    newNameValue,
}) => {
    const resp = await axios.post(
        `${API_SERVER_URL}/contest/${contestId}`,
        { newNameValue },
    );

    return resp.data.updatedContest
};
export const addNewContest = async ({
    contestName,
    contestCategory,
    contestDescription
}) => {
    const resp = await axios.post(
        `${API_SERVER_URL}/contests/`,
        {   contestName,
            contestCategory,
            contestDescription
        },
    );
    

    return resp.data.updatedContest
};