import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getRedirectUrlVNPAY } from "@/services/apiPayments";

export function useCreateRedirectUrlVNPAY() {

    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { mutate: createRedirectUrlVNPAY, isLoading } = useMutation({
        mutationFn: ({ orderId, amount }) => getRedirectUrlVNPAY({ orderId, amount }),
        onSuccess: (data) => {
            console.log(data);
            window.open(data.metadata.redirectUrl, "_blank");
            queryClient.invalidateQueries({ queryKey: ["orders"] });
        },
        onError: (error) => {
            console.log(error);
            toast.error("Thanh toán thất bại!");
        }
    })

    return { isLoading, createRedirectUrlVNPAY };
}