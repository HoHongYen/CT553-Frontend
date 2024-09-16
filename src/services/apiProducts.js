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

export async function search(search) {
    console.log("search", search);
    const res = (await api.get("/search", { params: { s: search } })).data;
    if (search === "") {
        return { metadata: { fullTextSearchResult: [], semanticSearchResult: [] } };
    }
    return res;
}

export async function searchByImageUrl(imageUrl) {
    console.log("imageUrl", imageUrl);
    if (!imageUrl) {
        console.log("imageUrl", imageUrl);
        return { metadata: { products: [] } };
    }
    const res = (await api.get("/search/image", { params: { imageUrl } })).data;
    console.log("searchByImageUrl API res", res);
    return res;
}

export async function getOneBySlug(slug) {
    const product = (await api.get(`/slug/${slug}`)).data;
    return product;
}