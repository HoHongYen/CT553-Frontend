import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { returnOrder as returnOrderApi } from "@/services/apiOrders";

export function useReturnOrder() {
    const queryClient = useQueryClient();
    const { mutate: returnOrder, isLoading } = useMutation({
        mutationFn: (orderId) => returnOrderApi(orderId),
        onSuccess: (order) => {
            console.log(order);
            toast.success("Gửi yêu cầu đổi trả thành công. Chúng tôi sẽ sớm liên lạc với bạn!");
            queryClient.invalidateQueries({ queryKey: ["orders"] });
        },
        onError: (error) => {
            console.log(error);
            toast.error("Lỗi đổi trả đơn hàng!");
        }
    })

    return { returnOrder, isLoading };
}