import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getOrderById } from "@/services/apiOrders";

export function useOrder() {
    const { orderId } = useParams();
    const {
        isLoading,
        data: { metadata: order } = {},
        error,
    } = useQuery({
        queryKey: ["order", orderId],
        queryFn: () => getOrderById(orderId),
        // retry: false,
    });
    return { isLoading, order, error };
}