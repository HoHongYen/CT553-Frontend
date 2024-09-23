import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createOrder as createOrderApi } from "@/services/apiOrders";
import { useOrder } from "@/context/OrderContext";
import { getRedirectUrlVNPAY } from "@/services/apiPayments";

export function useCreateOrder() {

    const { paymentMethods } = useOrder();

    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { mutate: createOrder, isLoading } = useMutation({
        mutationFn: (data) => createOrderApi(data),
        onSuccess: (order) => {
            console.log(order);
            toast.success("Đặt hàng thành công!");
            queryClient.invalidateQueries({ queryKey: ["orders"] });
            navigate("/tai-khoan/quan-ly-don-hang");
        },
        onError: (error) => {
            console.log(error);
            toast.error("Lỗi tạo đơn hàng!");
        }
    })

    return { createOrder, isLoading };
}