import createApiClient from "./api";

const baseUrl = "/api/reviews";
const api = createApiClient(baseUrl, { needAuth: true });

export async function createReview(data) {
    console.log("data", data);
    return (await api.post("", data)).data;
}

export async function getAllReviewsOfProduct(productId, { sortBy, page, limit }) {
    const reviews = (await api.get("/" + productId, { params: { sortBy, page, limit } })).data;
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

// export async function getAddressesOfCurrentUser() {
//     return (await api.get("/current-account")).data;
// }

// export async function deleteAddress(addressId) {
//     return (await api.delete("/" + addressId)).data;
// }
