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
    const filterValue = searchParams.get("discount") || "all";
    const filter = !filterValue || filterValue === "all" ? null : { field: "discount", value: filterValue };

    const filterMinPriceValue = searchParams.get("minPrice");
    const filterMinPrice = !filterMinPriceValue ? null : { field: "minPrice", value: filterMinPriceValue };

    const filterMaxPriceValue = searchParams.get("maxPrice");
    const filterMaxPrice = !filterMaxPriceValue ? null : { field: "maxPrice", value: filterMaxPriceValue };

    // SORT
    const sortByRaw = searchParams.get("sortBy") || "created_at-decs";
    const [field, direction] = sortByRaw.split("-");
    const sortBy = { field, direction };

    // PAGINATION
    const page = !searchParams.get("page")
        ? 1
        : Number(searchParams.get("page"));

    // QUERY
    const {
        isLoading,
        data: { metadata: { products, pagination: { totalProducts, totalPages } } } = { metadata: { products: [], pagination: { totalProducts: 0, totalPages: 0 } } },
        error,
    } = useQuery({
        queryKey: ["products", filter, filterMinPrice, filterMaxPrice, sortBy, page, mainCategory, subCategory],
        queryFn: () => getProducts({ categoryIds: !category ? [] : [category.id], type: PRODUCT_ALL, filter, filterMinPrice, filterMaxPrice, sortBy, page }),
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