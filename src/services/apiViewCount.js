import createApiClient from "./api";

const baseUrl = "/api/recommend/viewCounts";
const api = createApiClient(baseUrl);

export async function addViewCount(data) { // accountId, productId
    console.log("data", data);
    const addedData = (await api.post("/", data)).data;
    return addedData;
}

