import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { PAGE_SIZE, PRODUCT_ALL } from "@/utils/constants";
import { getProducts } from "@/services/apiProducts";
import { useCategories } from "../categories/useCategories";
import { formatSlugify } from "@/utils/helpers";

export function useProducts() {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();
    const { mainCategory, subCategory } = useParams();

    const { categories } = useCategories();
    const mainCategoryObject = categories.find(
        (category) => formatSlugify(category.name) === mainCategory
    );

    const subCategoryObject = (subCategory) ? mainCategoryObject.children.find(
        (category) => formatSlugify(category.name) === subCategory
    ) : null;

    const category = subCategoryObject || mainCategoryObject;

    // FILTER
    const filterValue = searchParams.get("trang-thai") || "tat-ca";
    const filter = !filterValue || filterValue === "tat-ca" ? null : { field: "trang-thai", value: filterValue };

    const filterMinPriceValue = Number(searchParams.get("gia-toi-thieu"));
    const filterMinPrice = !filterMinPriceValue ? null : { field: "gia-toi-thieu", value: filterMinPriceValue };

    const filterMaxPriceValue = Number(searchParams.get("gia-toi-da"));
    const filterMaxPrice = !filterMaxPriceValue ? null : { field: "gia-toi-da", value: filterMaxPriceValue };

    // SORT
    const sortByRaw = searchParams.get("thu-tu") || "moi-nhat";
    let sortBy = { field: "createdAt", direction: "desc" };
    if (sortByRaw === "cu-nhat") {
        sortBy = { field: "createdAt", direction: "asc" };
    } else if (sortByRaw === "ten-tang-dan") {
        sortBy = { field: "name", direction: "asc" };
    } else if (sortByRaw === "ten-giam-dan") {
        sortBy = { field: "name", direction: "desc" };
    }
    // else if (sortByRaw === "gia-tang-dan") {
    //     sortBy = { field: "finalPrice", direction: "asc" };
    // } else if (sortByRaw === "gia-giam-dan") {
    //     sortBy = { field: "finalPrice", direction: "desc" };
    // }

    // PAGINATION
    const page = !searchParams.get("trang")
        ? 1
        : Number(searchParams.get("trang"));

    const limit = searchParams.get("gioi-han") || PAGE_SIZE;

    // QUERY
    const {
        isLoading,
        data: { metadata: { products, pagination: { totalProducts, totalPages } } } = { metadata: { products: [], pagination: { totalProducts: 0, totalPages: 0 } } },
        error,
    } = useQuery({
        queryKey: ["products", filter, filterMinPrice, filterMaxPrice, sortBy, page, limit, mainCategory, subCategory],
        queryFn: () => getProducts({ categoryIds: !category ? [] : [category?.id], filter, filterMinPrice: filterMinPriceValue, filterMaxPrice: filterMaxPriceValue, sortBy, page, limit }),
    });

    // PRE_FETCHING
    // const pageCount = Math.ceil(count / PAGE_SIZE);
    // if (page < pageCount) {
    //     queryClient.prefetchQuery({
    //         queryKey: ["products", filter, sortBy, page + 1],
    //         queryFn: () => getProducts({ filter, filterMinPrice, filterMaxPrice, sortBy, page: page + 1 }),
    //     })
    // }
    // if (page > 1) {
    //     queryClient.prefetchQuery({
    //         queryKey: ["products", filter, sortBy, page - 1],
    //         queryFn: () => getProducts({ filter, filterMinPrice, filterMaxPrice, sortBy, page: page - 1 }),
    //     })
    // }

    return { isLoading, products, error, totalProducts, totalPages };
}