import createApiClient from "./api";

const baseUrl = "/api/payments";
const api = createApiClient(baseUrl, { needAuth: true });

export async function getPaymentMethods() {
    const paymentMethods = (await api.get("/methods")).data;
    return paymentMethods;
}

export async function getRedirectUrlVNPAY(data) {
    const redirectUrl = (await api.post("/create-payment-url", data)).data; // orderId, amount
    return redirectUrl;
}
