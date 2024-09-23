import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getAllOrderStatus, getOrdersByStatus } from "@/services/apiOrders";
import { useEffect, useState } from "react";
import { formatSlugify } from "@/utils/helpers";
import { ORDER_STATUS_TEXT, PAGE_SIZE } from "@/utils/constants";

export function useOrders() {
    const [searchParams] = useSearchParams();
    const [orderStatuses, setOrderStatuses] = useState([]);

    useEffect(() => {
        const getAllOrderStatuses = async () => {
            const res = await getAllOrderStatus();
            setOrderStatuses(res.metadata);
        }
        getAllOrderStatuses();
    }, []);

    // FILTER
    const filterValue = searchParams.get("trang-thai") || "tat-ca";
    const orderStatusId = filterValue === "tat-ca" ? 0 : orderStatuses.find((status) => formatSlugify(ORDER_STATUS_TEXT[status.name]) === filterValue)?.id;

    // SORT
    const sortByRaw = searchParams.get("thu-tu") || "don-moi-nhat";
    let sortBy = { field: "createdAt", direction: "desc" };
    if (sortByRaw === "don-cu-nhat") {
        sortBy = { field: "createdAt", direction: "asc" };
    } else if (sortByRaw === "gia-tang-dan") {
        sortBy = { field: "finalPrice", direction: "asc" };
    } else if (sortByRaw === "gia-giam-dan") {
        sortBy = { field: "finalPrice", direction: "desc" };
    }

    // PAGINATION
    const page = !searchParams.get("trang")
        ? 1
        : Number(searchParams.get("trang"));

    const limit = searchParams.get("gioi-han") || PAGE_SIZE;

    const { isLoading,
        data: { metadata: { orders, pagination: { totalOrders, totalPages } } } = { metadata: { orders: [], pagination: { totalOrders: 0, totalPages: 0 } } },
    } = useQuery({
        queryKey: ["orders", orderStatusId, sortBy, page, limit],
        queryFn: () => getOrdersByStatus({ orderStatusId, sortBy, page, limit }),
    })

    return { isLoading, orders, totalOrders, totalPages };
}



