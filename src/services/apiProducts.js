import { PRODUCT_ALL } from "@/utils/constants";
import createApiClient from "./api";

const baseUrl = "/api/products";
const api = createApiClient(baseUrl);

export async function getProducts({ type, categoryIds, filterMinPrice, filterMaxPrice, sortBy, limit = 10, page = 1 }) {
    // const products = (await api.get("", { params: { filterMinPrice, filterMaxPrice, sortBy, limit, page } })).data;
    const products = (await api.get("", { params: { type, categoryIds, filterMinPrice, filterMaxPrice, sortBy, limit, page } })).data;
    console.log("products", products);
    return products;
}

export async function getByCategories({ categoryIds = [], type = PRODUCT_ALL, limit = 10, page = 1 }) {
    console.log(categoryIds);
    return (
        await api.get("/", { params: { type, limit, categoryIds, page } })
    ).data;
}

export async function getOneBySlug(slug) {
    const product = (await api.get(`/slug/${slug}`)).data;
    console.log("product", product);
    return product;

    // return (await api.get(`/slug/${slug}`)).data;
}