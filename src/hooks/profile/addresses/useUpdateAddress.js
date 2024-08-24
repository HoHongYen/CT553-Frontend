import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAddress as updateAddressApi } from "@/services/apiAddresses";
import toast from "react-hot-toast";

export function useUpdateAddress() {
    const queryClient = useQueryClient();
    const { mutate: updateAddress, isLoading } = useMutation({
        mutationFn: ({addressId, updatedAddress}) => updateAddressApi(addressId, updatedAddress),
        onSuccess: (address) => {
            console.log(address);
            toast.success("Cập nhật địa chỉ thành công!");
            queryClient.invalidateQueries({ queryKey: ["addresses"] });
        },
        onError: (error) => {
            console.log(error);
            toast.error("Lỗi cập nhật địa chỉ!");
        }
    })

    return { updateAddress, isLoading };
}