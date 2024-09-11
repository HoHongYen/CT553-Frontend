import createApiClient from "./api";

const baseUrl = "/api/categories";
const api = createApiClient(baseUrl);

export async function createCategory(data) {
    console.log(data);
    return (await api.post("", data)).data;
}

export async function getCategories() {
    const categories = (await api.get("")).data;
    return categories;
}

export async function getBreadcrumbFromCategory(id) {
    return (await api.get(`/breadcrumb?fromCategoryId=${id}`)).data;
}

export async function getCategory(id) {
    return (await api.get(`/${id}`)).data;
}

