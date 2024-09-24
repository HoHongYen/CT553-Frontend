import createApiClient from "./api";

const baseUrl = "/api/orders";
const api = createApiClient(baseUrl, { needAuth: true });

export async function createOrder(data) {
    return (await api.post("", data)).data; // totalPrice, totalDiscount, finalPrice, shippingFee, deliveryAddressId, paymentMethodId, items
}

export async function cancelOrder(orderId) {
    return (await api.put("/" + orderId)).data;
}

export async function getAllOrderStatus() {
    return (await api.get("/status-all")).data;
}

export async function getOrdersByStatus({ orderStatusId, sortBy, page, limit }) {
    return (await api.get("/", { params: { orderStatusId, sortBy, page, limit } })).data;
}

export async function getOrderById(orderId) {
    return (await api.get("/customer/" + orderId)).data;
}



