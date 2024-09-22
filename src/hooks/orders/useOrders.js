import { useQuery } from "@tanstack/react-query";
import { getAllOrdersByUser } from "@/services/apiOrders";

export function useOrders() {
    const { isLoading, data: { metadata } = {} } = useQuery({
        queryKey: ["orders"],
        queryFn: getAllOrdersByUser,
    })

    return { isLoading, orders: metadata };
}



