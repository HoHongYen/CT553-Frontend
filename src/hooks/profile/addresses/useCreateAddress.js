import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAddress as createAddressApi } from "@/services/apiAddresses";
import toast from "react-hot-toast";

export function useCreateAddress() {
    const queryClient = useQueryClient();
    const { mutate: createAddress, isLoading } = useMutation({
        mutationFn: (data) => createAddressApi(data),
        onSuccess: (address) => {
            console.log(address);
            toast.success("Thêm địa chỉ thành công!");
            queryClient.invalidateQueries({ queryKey: ["addresses"] });
        },
        onError: (error) => {
            console.log(error);
            toast.error("Lỗi thêm địa chỉ!");
        }
    })

    return { createAddress, isLoading };
}