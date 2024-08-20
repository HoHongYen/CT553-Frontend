import { useMutation } from "@tanstack/react-query";
import { register as registerApi } from "../../services/apiAuths";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useRegister() {
    const navigate = useNavigate();
    const { mutate: register, isLoading } = useMutation({
        mutationFn: (data) => registerApi(data),
        onSuccess: (user) => {
            console.log(user);
            toast.success("Đăng ký thành công!");

            navigate("/dang-nhap", { replace: true });
        },
        onError: (error) => {
            console.log(error);
            toast.error("Email đã được sử dụng!");
        }
    })

    return { register, isLoading };
}