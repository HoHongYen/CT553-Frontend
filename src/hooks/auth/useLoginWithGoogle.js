import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginWithGoogle as loginWithGoogleApi } from "@/services/apiAuths";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLoginWithGoogle() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { mutate: loginWithGoogle, isLoading } = useMutation({
        mutationFn: ({ fullName, email, phone, avatarURL }) => loginWithGoogleApi({ fullName, email, phone, avatarURL }),
        onSuccess: (res) => {
            console.log("useLoginWithGoogle", res);
            toast.success("Đăng nhập thành công!");
            const user = res.metadata.account;
            queryClient.setQueryData(["user"], user);
            localStorage.setItem("accesstoken", res.metadata.tokens.accessToken);

            navigate("/", { replace: true });
        },
        onError: (error) => {
            console.log(error);
            toast.error("Đăng nhập bằng Google thất bại!");
        }
    });
    return { loginWithGoogle, isLoading };
}