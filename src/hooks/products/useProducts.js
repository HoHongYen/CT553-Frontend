import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "@/utils/constants";
import { getProducts } from "@/services/apiProducts";

export function useProducts() {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();

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
        data: { data: products, count } = {},
        error,
    } = useQuery({
        queryKey: ["products", filter, filterMinPrice, filterMaxPrice, sortBy, page],
        queryFn: () => getProducts({ filter, filterMinPrice, filterMaxPrice, sortBy, page }),
    });

    // PRE_FETCHING
    const pageCount = Math.ceil(count / PAGE_SIZE);
    if (page < pageCount) {
        queryClient.prefetchQuery({
            queryKey: ["products", filter, sortBy, page + 1],
            queryFn: () => getProducts(filter, filterMinPrice, filterMaxPrice, sortBy, page: page + 1),
        })
    }
    if (page > 1) {
        queryClient.prefetchQuery({
            queryKey: ["products", filter, sortBy, page - 1],
            queryFn: () => getProducts(filter, filterMinPrice, filterMaxPrice, sortBy, page: page - 1),
        })
    }

    return { isLoading, products, error, count };
}