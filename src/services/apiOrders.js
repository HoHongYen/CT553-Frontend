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

export async function getOrdersByStatus(orderStatusId) {
    return (await api.get("/?orderStatusId=" + orderStatusId)).data;
}

export async function getAllOrdersByUser() {
    console.log("getAllOrdersByUser");
    const res = await (await api.get("/?orderStatusId=0")).data;
    console.log(res);
    return res;
    // return (await api.get("/?orderStatusId=0")).data;
}

export async function getOrderById(orderId) {
    return (await api.get("/" + orderId)).data;
}



