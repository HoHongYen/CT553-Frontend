import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuths";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { mutate: login, isLoading } = useMutation({
        mutationFn: ({ email, password }) => loginApi({ email, password }),
        onSuccess: (res) => {
            toast.success("Đăng nhập thành công!");
            const user = res.metadata.account;
            queryClient.setQueryData(["user"], user);
            localStorage.setItem("accesstoken", res.metadata.tokens.accessToken);

            navigate("/", { replace: true });
        },
        onError: (error) => {
            console.log(error);
            toast.error("Sai email hoặc mật khẩu!");
        }
    });
    return { login, isLoading };
}