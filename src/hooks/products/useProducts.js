import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { formatSlugify } from "@/utils/helpers";
import { PAGE_SIZE } from "@/utils/constants";
import { useCategories } from "../categories/useCategories";
import { getProducts } from "@/services/apiProducts";

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
    // FILTER
    const discountValue = searchParams.get("giam-gia") || "tat-ca";
    const discount = !discountValue || discountValue === "tat-ca" ? "all" : discountValue;

    const visible = true;


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
    } else if (sortByRaw === "rating-tang-dan") {
        sortBy = { field: "rating", direction: "asc" };
    } else if (sortByRaw === "rating-giam-dan") {
        sortBy = { field: "rating", direction: "desc" };
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
        queryKey: ["products", discount, visible, filterMinPrice, filterMaxPrice, sortBy, page, limit, mainCategory, subCategory],
        queryFn: () => getProducts({ categoryIds: !category ? [] : [category?.id], discount, visible, filterMinPrice: filterMinPriceValue, filterMaxPrice: filterMaxPriceValue, sortBy, page, limit }),
    });

    // PRE_FETCHING
    if (page < totalPages) {
        queryClient.prefetchQuery({
            queryKey: ["products", discount, visible, filterMinPrice, filterMaxPrice, sortBy, page + 1, limit, mainCategory, subCategory],
            queryFn: () => getProducts({ categoryIds: !category ? [] : [category?.id], discount, visible, filterMinPrice: filterMinPriceValue, filterMaxPrice: filterMaxPriceValue, sortBy, pge: page + 1, limit }),
        })
    }
    if (page > 1) {
        queryClient.prefetchQuery({
            queryKey: ["products", discount, visible, filterMinPrice, filterMaxPrice, sortBy, page - 1, limit, mainCategory, subCategory],
            queryFn: () => getProducts({ categoryIds: !category ? [] : [category?.id], discount, visible, filterMinPrice: filterMinPriceValue, filterMaxPrice: filterMaxPriceValue, sortBy, page: page - 1, limit }),
        })
    }

    return { isLoading, products, error, totalProducts, totalPages };
}