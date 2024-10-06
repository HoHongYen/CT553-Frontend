import { useQuery } from "@tanstack/react-query";
import { getCurrentPolicy } from "@/services/apiCheckProductPolicies";

export function useCheckProductPolicy() {
    const {
        isLoading,
        data: { metadata: checkProductPolicy } = {},
        error,
    } = useQuery({
        queryKey: ["checkProductPolicy"],
        queryFn: getCurrentPolicy,
        retry: false,
    });
    return { isLoading, checkProductPolicy, error };
}