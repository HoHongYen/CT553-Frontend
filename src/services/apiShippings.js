import createApiClient from "./api";

const baseUrl = "/api/shippings";
const api = createApiClient(baseUrl, { needAuth: true });

export async function getShippingFree(data) {
    return (await api.post("/fee", data)).data; // toDistrictId, toWardCode, weightInGram
}


