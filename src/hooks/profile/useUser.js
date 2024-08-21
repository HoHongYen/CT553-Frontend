import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/services/apiAuths";

export function useUser() {
    const { isLoading, data: user } = useQuery({
        queryKey: ["user"],
        queryFn: getCurrentUser,
    })

    return { isLoading, user, isAuthenticated: user?.id };
}