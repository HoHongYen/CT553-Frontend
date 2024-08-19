import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useLogout() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate: logout, isLoading } = useMutation({
        onSettled: () => {
            localStorage.removeItem("accesstoken");
            queryClient.removeQueries();
            navigate("/", { replace: true });
        },
    });

    return { logout, isLoading };
}