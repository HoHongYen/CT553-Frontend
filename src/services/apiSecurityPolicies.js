import createApiClient from "./api";

const baseUrl = "/api/securityPolicies";
const api = createApiClient(baseUrl);

export async function getAllPolicies() {
    const categories = (await api.get("/")).data;
    return categories;
}

export async function getCurrentPolicy() {
    const categories = (await api.get("/current")).data;
    return categories;
}





