import { useQuery } from "@tanstack/react-query";
import { getCurrentPolicy } from "@/services/apiReturnPolicies";

export function useReturnPolicy() {
    const {
        isLoading,
        data: { metadata: returnPolicy } = {},
        error,
    } = useQuery({
        queryKey: ["returnPolicy"],
        queryFn: getCurrentPolicy,
        retry: false,
    });
    return { isLoading, returnPolicy, error };
}