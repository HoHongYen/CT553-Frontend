import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuths";
import toast from "react-hot-toast";

export function useUpdateUser() {
    const queryClient = useQueryClient();

    const { isLoading: isUpdating, mutate: updateUser } = useMutation({
        mutationFn: updateCurrentUser,
        onSuccess: (res) => {
            toast.success("Cập nhật thông tin thành công!");
            const user = res.metadata;
            queryClient.setQueryData(["user"], user);
            // queryClient.invalidateQueries({ queryKey: ["user"] });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
    return { isUpdating, updateUser };
}