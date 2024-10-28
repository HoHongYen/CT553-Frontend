import createApiClient from "./api";

const baseUrl = "/api/coupons";
const api = createApiClient(baseUrl, { needAuth: true });

export async function getValidCoupons() {
    const coupons = (await api.get("/valid")).data;
    return coupons;
}

export async function collectCoupon(couponCode) {
    const response = await api.post("/collect", { couponCode });
    return response.data;
}

export async function getCollectedCoupons() {
    const coupons = (await api.get("/collected")).data;
    console.log("getCollectedCoupons", coupons);
    return coupons;
}




