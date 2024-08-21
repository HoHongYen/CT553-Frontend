import { useMutation } from "@tanstack/react-query";
import { changePassword as changePasswordApi } from "@/services/apiAuths";
import toast from "react-hot-toast";

export function useChangePassword() {
    const { isLoading: isUpdating, mutate: changePassword } = useMutation({
        mutationFn: changePasswordApi,
        onSuccess: (res) => {
            toast.success("Thay đổi mật khẩu thành công!");
            console.log(res);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
    return { isUpdating, changePassword };
}