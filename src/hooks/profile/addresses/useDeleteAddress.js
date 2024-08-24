import { deleteAddress as deleteAddressApi } from "@/services/apiAddresses";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useDeleteAddress() {
    const queryClient = useQueryClient();

    const { isLoading, mutate: deleteAddress } = useMutation({
        mutationFn: deleteAddressApi,
        onSuccess: () => {
            toast.success("Xóa địa chỉ thành công!");
            queryClient.invalidateQueries({ queryKey: ["addresses"] });
        },
        onError: () => {
            toast.error("Lỗi xóa địa chỉ!");
        },
    });

    return { isLoading, deleteAddress };
}