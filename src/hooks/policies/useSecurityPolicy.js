import { useQuery } from "@tanstack/react-query";
import { getCurrentPolicy } from "@/services/apiSecurityPolicies";

export function useSecurityPolicy() {
    const {
        isLoading,
        data: { metadata: securityPolicy } = {},
        error,
    } = useQuery({
        queryKey: ["securityPolicy"],
        queryFn: getCurrentPolicy,
        retry: false,
    });
    return { isLoading, securityPolicy, error };
}