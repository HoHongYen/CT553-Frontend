import createApiClient from "./api";

const baseUrl = "/api/upload";
const api = createApiClient(baseUrl);

export async function uploadImage(formData) {
    return (await api.post("/image", formData)).data;
}

export async function destroyImage(uploadedImageId) {
    return (await api.delete("/" + uploadedImageId)).data;
}

export async function uploadImageToDisk(formData) {
    return (await api.post("/image/disk", formData)).data;
}

export async function destroyImageInDisk(uploadedImagePath) {
    return (await api.delete("/disk/" + uploadedImagePath)).data;
}