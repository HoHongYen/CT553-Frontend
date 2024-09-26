import { getAllReviewsOfProduct } from "@/services/apiReviews";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { useProduct } from "../products/useProduct";
import { PAGE_SIZE_REVIEW } from "@/utils/constants";

export function useReviews() {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();
    const { slug } = useParams();

    // // SORT
    const sortByRaw = searchParams.get("thu-tu") || "moi-nhat";
    let sortBy = { field: "createdAt", direction: "desc" };
    if (sortByRaw === "cu-nhat") {
        sortBy = { field: "createdAt", direction: "asc" };
    } else if (sortByRaw === "rating-tang-dan") {
        sortBy = { field: "rating", direction: "asc" };
    } else if (sortByRaw === "rating-giam-dan") {
        sortBy = { field: "rating", direction: "desc" };
    }

    // PAGINATION
    const page = !searchParams.get("trang")
        ? 1
        : Number(searchParams.get("trang"));

    const limit = searchParams.get("gioi-han") || PAGE_SIZE_REVIEW;

    const { product } = useProduct();

    const { isLoading,
        data: { metadata: { reviews, pagination: { totalReviews, totalPages } } } = { metadata: { reviews: [], pagination: { totalReviews: 0, totalPages: 0 } } },
    } = useQuery({
        queryKey: ["reviews", slug, sortBy, page, limit],
        queryFn: () => getAllReviewsOfProduct(product.id, { sortBy, page, limit }),
    })

    // PRE_FETCHING
    if (page < totalPages) {
        queryClient.prefetchQuery({
            queryKey: ["reviews", slug, sortBy, page + 1, limit],
            queryFn: () => getAllReviewsOfProduct(product.id, { sortBy, page: page + 1, limit }),
        })
    }
    if (page > 1) {
        queryClient.prefetchQuery({
            queryKey: ["reviews", slug, sortBy, page - 1, limit],
            queryFn: () => getAllReviewsOfProduct(product.id, { sortBy, page: page - 1, limit }),
        })
    }

    return { isLoading, reviews, totalReviews, totalPages };
}



