import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { cancelOrder as cancelOrderApi } from "@/services/apiOrders";

export function useCancelOrder() {
    const queryClient = useQueryClient();
    const { mutate: cancelOrder, isLoading } = useMutation({
        mutationFn: (orderId) => cancelOrderApi(orderId),
        onSuccess: (order) => {
            console.log(order);
            toast.success("Hủy đơn hàng thành công!");
            queryClient.invalidateQueries({ queryKey: ["orders"] });
        },
        onError: (error) => {
            console.log(error);
            toast.error("Lỗi hủy đơn hàng!");
        }
    })

    return { cancelOrder, isLoading };
}