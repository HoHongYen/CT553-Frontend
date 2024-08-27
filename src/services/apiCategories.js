import createApiClient from "./api";
import { uploadImage } from "./apiUpload";

const baseUrl = "/api/categories";
const api = createApiClient(baseUrl);

export async function createCategory(data) {
    console.log(data);
    return (await api.post("", data)).data;
}

export async function getCategories() {
    const categories = (await api.get("")).data;
    console.log("categories", categories);
    return categories;
}

export async function getBreadcrumbFromCategory(id) {
    return (await api.get(`/breadcrumb?fromCategoryId=${id}`)).data;
}

export async function getCategory(id) {
    return (await api.get(`/${id}`)).data;
}


// createCategoryWithUrl

const getUrlExtension = (url) => {
    return url
        .split(/[#?]/)[0]
        .split(".")
        .pop()
        .trim();
}

const changeImageUrlToFile = async (imgUrl) => {
    var imgExt = getUrlExtension(imgUrl);

    try {
        const response = await fetch(imgUrl, { mode: 'no-cors' });
        console.log(response);
        const blob = await response.blob();
        const file = new File([blob], "profileImage." + imgExt, {
            type: blob.type,
        });
        return file;
    } catch (e) {
        console.log(e);
    }
}

export async function createCategoryWithUrl({ name, parentId, thumbnailImageUrl, slug }) {
    console.log(name, parentId, thumbnailImageUrl, slug);

    const form = new FormData();
    const file = await changeImageUrlToFile(thumbnailImageUrl);
    form.append("image", file);
    const uploadedImage = await uploadImage(form);
    const data = {
        name, parentId: +parentId, thumbnailImageId: uploadedImage.metadata.id, slug
    }
    console.log(data);

    return (await api.post("", data)).data;
}

