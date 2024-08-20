import createApiClient from "./api";

const baseUrl = "/api/categories";
const api = createApiClient(baseUrl);

export async function createCategory(data) {
    console.log(data);
    return (await api.post("", data)).data;
}

export async function getCategories() {
    console.log("getCategories");
   const categories = (await api.get("")).data;
   console.log("categories", categories);
   return categories
}

