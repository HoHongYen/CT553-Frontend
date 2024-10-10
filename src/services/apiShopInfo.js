import createApiClient from "./api";

const baseUrl = "/api/shopInfo";
const api = createApiClient(baseUrl);

export async function createShopInfo(data) {
    return (await api.post("", data)).data;
}

export async function getShopInfo() {
    const shopInfo = (await api.get("/")).data;
    return shopInfo;
}

export async function updateShopInfo(shopInfoId, data) {
    return (await api.put("/" + shopInfoId, data)).data;
}





