import createApiClient from "./api";

const baseUrl = "/api/banners";
const api = createApiClient(baseUrl);

export async function getHomeBanners() {
    const banners = (await api.get("/getByBannerCategory/1")).data;
    return banners;
}

export async function getHotDealBanners() {
    const banners = (await api.get("/getByBannerCategory/2")).data;
    return banners;
}