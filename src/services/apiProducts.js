import { PAGE_SIZE, PRODUCT_ALL } from "@/utils/constants";
import createApiClient from "./api";

const baseUrl = "/api/products";
const api = createApiClient(baseUrl);

export async function getProducts({ type = PRODUCT_ALL, categoryIds, filter, filterMinPrice = 0, filterMaxPrice = 0, sortBy, page = 1, limit = PAGE_SIZE }) {
    const products = (await api.get("/", { params: { type, categoryIds, filter, filterMinPrice, filterMaxPrice, sortBy, limit, page } })).data;
    return products;
}

export async function getHomeProducts({ type, limit }) {
    const products = (await api.get("/", { params: { type, limit } })).data;
    return products;
}

export async function getOneBySlug(slug) {
    const product = (await api.get(`/slug/${slug}`)).data;
    return product;
}