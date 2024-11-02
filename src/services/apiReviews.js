import createApiClient from "./api";

const baseUrl = "/api/reviews";
const api = createApiClient(baseUrl, { needAuth: true });

export async function checkIfUserHasReviewed(data) { // orderId, variantId
    console.log("data", data);
    const res = (await api.post("/check", data)).data;
    return res;
}

export async function createReview(data) {
    console.log("data", data);
    return (await api.post("", data)).data;
}

export async function getAllReviewsOfProduct(productId, { sortBy, page, limit }) {
    const reviews = (await api.get("/" + productId, { params: { sortBy, page, limit } })).data;
    console.log("reviews", reviews);
    return reviews;
}

export async function getTopReviews() {
    const reviews = (await api.get("/top")).data;
    console.log("reviews", reviews);
    return reviews;
}

export async function uploadImage(id, data) {
    return (await api.post(`/${id}/add-image`, data)).data;
}

export async function deleteImage(reviewImageId) {
    console.log("deleteImage reviewImageId", reviewImageId);
    return (await api.delete(`/delete-image/${reviewImageId}`)).data;
}

export async function updateReview(reviewId, updatedReview) {
    return (await api.put("/" + reviewId, updatedReview)).data;
}

