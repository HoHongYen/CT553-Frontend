import { getAllReviewsOfProduct } from "@/services/apiReviews";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { useProduct } from "../products/useProduct";

export function useReviews() {
    // const [searchParams] = useSearchParams();
    const { slug } = useParams();

    // // FILTER
    // const filterValue = searchParams.get("trang-thai") || "tat-ca";
    // const orderStatusId = filterValue === "tat-ca" ? 0 : orderStatuses.find((status) => formatSlugify(ORDER_STATUS_TEXT[status.name]) === filterValue)?.id;

    // // SORT
    // const sortByRaw = searchParams.get("thu-tu") || "don-moi-nhat";
    // let sortBy = { field: "createdAt", direction: "desc" };
    // if (sortByRaw === "don-cu-nhat") {
    //     sortBy = { field: "createdAt", direction: "asc" };
    // } else if (sortByRaw === "gia-tang-dan") {
    //     sortBy = { field: "finalPrice", direction: "asc" };
    // } else if (sortByRaw === "gia-giam-dan") {
    //     sortBy = { field: "finalPrice", direction: "desc" };
    // }

    // // PAGINATION
    // const page = !searchParams.get("trang")
    //     ? 1
    //     : Number(searchParams.get("trang"));

    // const limit = searchParams.get("gioi-han") || PAGE_SIZE;

    // const { isLoading,
    //     data: { metadata: { orders, pagination: { totalOrders, totalPages } } } = { metadata: { orders: [], pagination: { totalOrders: 0, totalPages: 0 } } },
    // } = useQuery({
    //     queryKey: ["orders", orderStatusId, sortBy, page, limit],
    //     queryFn: () => getOrdersByStatus({ orderStatusId, sortBy, page, limit }),
    // })

    const { product } = useProduct();

    const { isLoading, data: { metadata: reviews } = { metadata: [] }
    } = useQuery({
        queryKey: ["reviews", slug],
        queryFn: () => getAllReviewsOfProduct(product.id),
    });

    return { isLoading, reviews };
}



