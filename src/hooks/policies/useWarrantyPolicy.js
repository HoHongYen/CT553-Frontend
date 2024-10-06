import { useQuery } from "@tanstack/react-query";
import { getCurrentPolicy } from "@/services/apiWarrantyPolicies";

export function useWarrantyPolicy() {
    const {
        isLoading,
        data: { metadata: warrantyPolicy } = {},
        error,
    } = useQuery({
        queryKey: ["warrantyPolicy"],
        queryFn: getCurrentPolicy,
        retry: false,
    });
    return { isLoading, warrantyPolicy, error };
}