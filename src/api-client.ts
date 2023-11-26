import axios from "axios";
import { API_SERVER_URL } from "./public-config";

// Fetching All contest Request
export const fetchContests = async () => {
    const resp = await axios.get(`${API_SERVER_URL}/contests`);

    return resp.data.contests
};

// Fetching Single Contest Request
export const fetchSingleContests = async (contestId) => {
    const resp = await axios.get(`${API_SERVER_URL}/contest/${contestId}`);

    return resp.data.contest
};

// Deleting Single Contest
export const deleteSingleContests = async (contestId) => {
    const resp = await axios.delete(`${API_SERVER_URL}/delete/${contestId}`);

    return resp.data.deleted
};

// Requesting to add a name to the Contest
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

// Requesting to add new contest
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